import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useWorkspace } from "./useWorkspace";
import { useAuth } from "./useAuth";
import { createWorkspaceEventStream } from "../services/workspace-events.service";
import type { WorkspaceEventPayload } from "../types/workspace-event";
import { notifyTransactionChanged } from "../utils/events";

export const useWorkspaceEvents = () => {
  const { t } = useTranslation();

  const {
    activeWorkspaceId,
    refreshWorkspaces,
    setActiveWorkspaceById,
    workspaces,
  } = useWorkspace();

  const { user, logout } = useAuth();

  useEffect(() => {
    if (!activeWorkspaceId || !user?.id) return;

    const abortController = new AbortController();

    const parsePayload = (data: string): WorkspaceEventPayload | null => {
      try {
        return JSON.parse(data) as WorkspaceEventPayload;
      } catch {
        return null;
      }
    };

    createWorkspaceEventStream({
      workspaceId: activeWorkspaceId,
      signal: abortController.signal,

      onMessage: async (eventName, data) => {
        const payload = parsePayload(data);
        if (!payload) return;

        if (
          eventName === "transaction:created" ||
          eventName === "transaction:updated" ||
          eventName === "transaction:deleted"
        ) {
          notifyTransactionChanged();

          if (payload.actorUserId && payload.actorUserId !== user.id) {
            toast.info(t("workspace.transaction_changed_by_member"));
          }

          return;
        }

        if (eventName === "workspace:updated") {
          await refreshWorkspaces();

          if (payload.actorUserId && payload.actorUserId !== user.id) {
            toast.info(t("workspace.workspace_updated_by_member"));
          }

          return;
        }

        if (eventName === "member:updated") {
          await refreshWorkspaces();

          if (payload.targetUserId === user.id) {
            toast.info(t("workspace.your_role_updated"));
          } else if (payload.actorUserId !== user.id) {
            toast.info(t("workspace.member_role_updated"));
          }

          return;
        }

        if (eventName === "member:removed") {
          await refreshWorkspaces();

          if (payload.targetUserId === user.id) {
            toast.error(t("workspace.you_removed_from_workspace"));

            const nextWorkspace = workspaces.find(
              (workspace) => workspace.id !== activeWorkspaceId,
            );

            if (nextWorkspace) {
              setActiveWorkspaceById(nextWorkspace.id);
            } else {
              await logout();
            }

            return;
          }

          if (payload.actorUserId !== user.id) {
            toast.info(t("workspace.member_removed"));
          }

          return;
        }

        if (eventName === "invitation:created") {
          if (payload.actorUserId !== user.id) {
            toast.info(t("workspace.new_invitation_created"));
          }
        }
      },

      onError: (error) => {
        console.error("Workspace SSE connection error:", error);
      },
    });

    return () => {
      abortController.abort();
    };
  }, [
    activeWorkspaceId,
    user?.id,
    refreshWorkspaces,
    setActiveWorkspaceById,
    workspaces,
    logout,
    t,
  ]);
};
