import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../../services/workspace.service";
import { useWorkspace } from "../../../hooks/useWorkspace";

import type { WorkspaceInvitation } from "../../../types/workspace";

import Button from "../../ui/Button/Button";

import "./WorkspaceInvitationsList.scss";
import i18n from "../../../context/i18n";

function WorkspaceInvitationsList() {
  const { t } = useTranslation();
  const { activeWorkspaceId, activeWorkspace, canManageWorkspace } =
    useWorkspace();

  const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusLabel = (status: WorkspaceInvitation["status"]) => {
    return t(`workspace.invitation_status.${status.toLowerCase()}`);
  };

  const fetchInvitations = useCallback(async () => {
    if (!activeWorkspaceId) return;

    try {
      setIsLoading(true);

      const response =
        await workspaceService.getWorkspaceInvitations(activeWorkspaceId);

      setInvitations(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(t("workspace.invitations_fetch_failed"), {
        description: t("workspace.invitations_fetch_failed_desc"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeWorkspaceId, t]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  if (!activeWorkspaceId) {
    return (
      <div className="workspace-invitations-list">
        <p className="workspace-invitations-list__empty">
          {t("workspace.no_active_workspace")}
        </p>
      </div>
    );
  }

  if (!canManageWorkspace) {
    return (
      <div className="workspace-invitations-list">
        <p className="workspace-invitations-list__empty">
          {t("workspace.owner_permission_required")}
        </p>
      </div>
    );
  }

  return (
    <div className="workspace-invitations-list">
      <div className="workspace-invitations-list__top">
        <div>
          <h3>{activeWorkspace?.name}</h3>
          <p>{t("workspace.invitations_description")}</p>
        </div>

        <Button variant="link" onClick={fetchInvitations} disabled={isLoading}>
          {t("workspace.refresh")}
        </Button>
      </div>

      {isLoading ? (
        <p className="workspace-invitations-list__empty">
          {t("workspace.invitations_loading")}
        </p>
      ) : invitations.length === 0 ? (
        <p className="workspace-invitations-list__empty">
          {t("workspace.invitations_empty")}
        </p>
      ) : (
        <>
          <div className="workspace-invitations-list__header">
            <span>{t("workspace.email")}</span>
            <span>{t("workspace.role")}</span>
            <span>{t("workspace.status")}</span>
            <span>{t("workspace.expires_at")}</span>
          </div>

          <div className="workspace-invitations-list__items">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="workspace-invitations-list__item"
              >
                <div className="workspace-invitations-list__email">
                  {invitation.email}
                </div>

                <div>
                  <span
                    className={`workspace-invitations-list__role workspace-invitations-list__role--${invitation.role.toLowerCase()}`}
                  >
                    {invitation.role}
                  </span>
                </div>

                <div>
                  <span
                    className={`workspace-invitations-list__status workspace-invitations-list__status--${invitation.status.toLowerCase()}`}
                  >
                    {getStatusLabel(invitation.status)}
                  </span>
                </div>

                <div className="workspace-invitations-list__date">
                  {new Date(invitation.expiresAt).toLocaleDateString(
                    i18n.language === "tr" ? "tr-TR" : "en-US",
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WorkspaceInvitationsList;
