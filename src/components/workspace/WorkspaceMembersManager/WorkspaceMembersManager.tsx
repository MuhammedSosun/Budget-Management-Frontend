import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../../services/workspace.service";
import { useWorkspace } from "../../../hooks/useWorkspace";

import type { WorkspaceMember, WorkspaceRole } from "../../../types/workspace";

import Button from "../../ui/Button/Button";
import Select from "../../ui/Select/Select";
import { Modal } from "../../ui/Modal/Modal";

import "./WorkspaceMembersManager.scss";

type EditableWorkspaceRole = Exclude<WorkspaceRole, "OWNER">;

function WorkspaceMembersManager() {
  const { t } = useTranslation();

  const { activeWorkspaceId, activeWorkspace, canManageWorkspace } =
    useWorkspace();

  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingMemberId, setProcessingMemberId] = useState<string | null>(
    null,
  );
  const [memberToRemove, setMemberToRemove] = useState<WorkspaceMember | null>(
    null,
  );

  const fetchMembers = useCallback(async () => {
    if (!activeWorkspaceId) return;

    try {
      setIsLoading(true);

      const response =
        await workspaceService.getWorkspaceMembers(activeWorkspaceId);

      setMembers(response.data || []);
    } catch (error) {
      console.error(error);

      toast.error(t("workspace.members_fetch_failed"), {
        description: t("workspace.members_fetch_failed_desc"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeWorkspaceId, t]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRoleChange = async (
    memberId: string,
    currentRole: WorkspaceRole,
    nextRole: EditableWorkspaceRole,
  ) => {
    if (!activeWorkspaceId) return;

    if (currentRole === nextRole) return;

    try {
      setProcessingMemberId(memberId);

      await workspaceService.updateWorkspaceMemberRole(
        activeWorkspaceId,
        memberId,
        { role: nextRole },
      );

      toast.success(t("workspace.role_updated"), {
        description: t("workspace.role_updated_desc"),
      });

      await fetchMembers();
    } catch (error) {
      console.error(error);

      toast.error(t("workspace.role_update_failed"), {
        description: t("workspace.role_update_failed_desc"),
      });
    } finally {
      setProcessingMemberId(null);
    }
  };

  const handleRemoveMember = async () => {
    if (!activeWorkspaceId || !memberToRemove) return;

    try {
      setProcessingMemberId(memberToRemove.id);

      await workspaceService.removeWorkspaceMember(
        activeWorkspaceId,
        memberToRemove.id,
      );

      toast.success(t("workspace.member_removed"), {
        description: t("workspace.member_removed_desc"),
      });
      setMemberToRemove(null);
      await fetchMembers();
    } catch (error) {
      console.error(error);

      toast.error(t("workspace.member_remove_failed"), {
        description: t("workspace.member_remove_failed_desc"),
      });
    } finally {
      setProcessingMemberId(null);
    }
  };

  if (!activeWorkspaceId) {
    return (
      <div className="workspace-members-manager">
        <p className="workspace-members-manager__empty">
          {t("workspace.no_active_workspace")}
        </p>
      </div>
    );
  }

  if (!canManageWorkspace) {
    return (
      <div className="workspace-members-manager">
        <p className="workspace-members-manager__empty">
          {t("workspace.owner_permission_required")}
        </p>
      </div>
    );
  }

  return (
    <div className="workspace-members-manager">
      <div className="workspace-members-manager__top">
        <div>
          <h3>{activeWorkspace?.name}</h3>
          <p>{t("workspace.members_description")}</p>
        </div>

        <Button variant="link" onClick={fetchMembers} disabled={isLoading}>
          {t("workspace.refresh")}
        </Button>
      </div>

      {isLoading ? (
        <p className="workspace-members-manager__empty">
          {t("workspace.members_loading")}
        </p>
      ) : members.length === 0 ? (
        <p className="workspace-members-manager__empty">
          {t("workspace.members_empty")}
        </p>
      ) : (
        <>
          <div className="workspace-members-manager__header">
            <span>{t("workspace.user")}</span>
            <span>{t("workspace.email")}</span>
            <span>{t("workspace.role")}</span>
            <span>{t("workspace.action")}</span>
          </div>

          <div className="workspace-members-manager__list">
            {members.map((member) => {
              const isOwner = member.role === "OWNER";
              const isProcessing = processingMemberId === member.id;

              return (
                <div
                  className="workspace-members-manager__item"
                  key={member.id}
                >
                  <div className="workspace-members-manager__user">
                    <img
                      src={
                        member.user.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${member.user.firstName}+${member.user.lastName}`
                      }
                      alt={`${member.user.firstName} ${member.user.lastName}`}
                    />

                    <div>
                      <strong>
                        {member.user.firstName} {member.user.lastName}
                      </strong>
                      <small>{member.role}</small>
                    </div>
                  </div>

                  <div className="workspace-members-manager__email">
                    {member.user.email}
                  </div>

                  <div className="workspace-members-manager__role-area">
                    {isOwner ? (
                      <span className="workspace-members-manager__owner-badge">
                        OWNER
                      </span>
                    ) : (
                      <Select
                        label=""
                        value={member.role}
                        options={[
                          { label: "EDITOR", value: "EDITOR" },
                          { label: "VIEWER", value: "VIEWER" },
                        ]}
                        onChange={(value) =>
                          handleRoleChange(
                            member.id,
                            member.role,
                            value as EditableWorkspaceRole,
                          )
                        }
                      />
                    )}
                  </div>

                  <div className="workspace-members-manager__actions">
                    <Button
                      variant="danger"
                      disabled={isOwner || isProcessing}
                      isLoading={isProcessing}
                      onClick={() => setMemberToRemove(member)}
                    >
                      {t("workspace.remove")}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <Modal
        isOpen={Boolean(memberToRemove)}
        onClose={() => setMemberToRemove(null)}
        title={t("workspace.remove_member_title")}
        width="420px"
      >
        <div className="workspace-members-manager__confirm">
          <p>
            <strong>
              {memberToRemove?.user.firstName} {memberToRemove?.user.lastName}
            </strong>{" "}
            {t("workspace.remove_member_message")}
          </p>
          <div className="workspace-members-manager__confirm-actions">
            <Button
              variant="link"
              type="button"
              onClick={() => setMemberToRemove(null)}
              disabled={Boolean(processingMemberId)}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="danger"
              type="button"
              isLoading={processingMemberId === memberToRemove?.id}
              disabled={Boolean(processingMemberId)}
              onClick={handleRemoveMember}
            >
              {t("workspace.remove")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WorkspaceMembersManager;
