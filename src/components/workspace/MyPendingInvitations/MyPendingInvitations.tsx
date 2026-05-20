import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../../services/workspace.service";
import { useWorkspace } from "../../../hooks/useWorkspace";
import type { WorkspaceInvitation } from "../../../types/workspace";

import Button from "../../ui/Button/Button";

import "./MyPendingInvitations.scss";

interface MyPendingInvitationsProps {
  onSuccess?: () => Promise<void> | void;
}

type ProcessingAction = "accept" | "reject";

function MyPendingInvitations({ onSuccess }: MyPendingInvitationsProps) {
  const { t, i18n } = useTranslation();
  const { refreshWorkspaces } = useWorkspace();

  const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingToken, setProcessingToken] = useState<string | null>(null);
  const [processingAction, setProcessingAction] =
    useState<ProcessingAction | null>(null);

  const locale = i18n.language === "en" ? "en-US" : "tr-TR";

  const fetchPendingInvitations = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await workspaceService.getMyPendingInvitations();

      setInvitations(response.data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      toast.error(t("workspace.pending_invitations_fetch_failed"), {
        description: t("workspace.pending_invitations_fetch_failed_desc"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchPendingInvitations();
  }, [fetchPendingInvitations]);

  const handleAccept = async (token?: string) => {
    if (!token) return;

    try {
      setProcessingToken(token);
      setProcessingAction("accept");

      await workspaceService.acceptInvitation(token);

      toast.success(t("workspace.invitation_accepted"), {
        description: t("workspace.invitation_accepted_desc"),
      });

      await refreshWorkspaces();
      await fetchPendingInvitations();
      await onSuccess?.();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      toast.error(t("workspace.invitation_accept_failed"), {
        description: t("workspace.invitation_accept_failed_desc"),
      });
    } finally {
      setProcessingToken(null);
      setProcessingAction(null);
    }
  };

  const handleReject = async (token?: string) => {
    if (!token) return;

    try {
      setProcessingToken(token);
      setProcessingAction("reject");

      await workspaceService.rejectInvitation(token);

      toast.success(t("workspace.invitation_rejected"), {
        description: t("workspace.invitation_rejected_desc"),
      });

      await fetchPendingInvitations();
      await onSuccess?.();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      toast.error(t("workspace.invitation_reject_failed"), {
        description: t("workspace.invitation_reject_failed_desc"),
      });
    } finally {
      setProcessingToken(null);
      setProcessingAction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="my-pending-invitations">
        <p className="my-pending-invitations__empty">
          {t("workspace.pending_invitations_loading")}
        </p>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="my-pending-invitations">
        <p className="my-pending-invitations__empty">
          {t("workspace.pending_invitations_empty")}
        </p>
      </div>
    );
  }

  return (
    <div className="my-pending-invitations">
      <div className="my-pending-invitations__header">
        <span>{t("workspace.workspace")}</span>
        <span>{t("workspace.role")}</span>
        <span>{t("workspace.expires_at")}</span>
        <span>{t("workspace.action")}</span>
      </div>

      <div className="my-pending-invitations__items">
        {invitations.map((invitation) => {
          const isProcessing = processingToken === invitation.token;
          const isAccepting = isProcessing && processingAction === "accept";
          const isRejecting = isProcessing && processingAction === "reject";

          return (
            <div key={invitation.id} className="my-pending-invitations__item">
              <div className="my-pending-invitations__workspace">
                <strong>{invitation.workspace?.name || "Workspace"}</strong>

                {invitation.workspace?.description && (
                  <small>{invitation.workspace.description}</small>
                )}
              </div>

              <div>
                <span
                  className={`my-pending-invitations__role my-pending-invitations__role--${invitation.role.toLowerCase()}`}
                >
                  {invitation.role}
                </span>
              </div>

              <div className="my-pending-invitations__date">
                {new Date(invitation.expiresAt).toLocaleDateString(locale)}
              </div>

              <div className="my-pending-invitations__actions">
                <Button
                  variant="success"
                  disabled={isProcessing}
                  isLoading={isAccepting}
                  onClick={() => handleAccept(invitation.token)}
                >
                  {t("workspace.accept")}
                </Button>

                <Button
                  variant="danger"
                  disabled={isProcessing}
                  isLoading={isRejecting}
                  onClick={() => handleReject(invitation.token)}
                >
                  {t("workspace.reject")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPendingInvitations;
