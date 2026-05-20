import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWorkspace } from "../../../hooks/useWorkspace";
import { Modal } from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import CreateWorkspaceForm from "../CreateWorkspaceForm/CreateWorkspaceForm";
import CreateInvitationForm from "../CreateInvitationForm/CreateInvitationForm";
import WorkspaceMembersManager from "../WorkspaceMembersManager/WorkspaceMembersManager";
import WorkspaceInvitationsList from "../WorkspaceInvitationsList/WorkspaceInvitationsList";
import MyPendingInvitations from "../MyPendingInvitations/MyPendingInvitations";

import "./WorkspaceSettings.scss";

type WorkspaceModalType =
  | "createWorkspace"
  | "createInvitation"
  | "manageMembers"
  | "workspaceInvitations"
  | "myPendingInvitations"
  | null;

function WorkspaceSettings() {
  const { t } = useTranslation();

  const {
    activeWorkspace,
    activeWorkspaceId,
    activeRole,
    canManageWorkspace,
    refreshWorkspaces,
    isWorkspaceLoading,
  } = useWorkspace();

  const [activeModal, setActiveModal] = useState<WorkspaceModalType>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSuccess = async () => {
    await refreshWorkspaces();
    closeModal();
  };

  const getModalTitle = (modalType: WorkspaceModalType) => {
    switch (modalType) {
      case "createWorkspace":
        return t("workspace.create_workspace");
      case "createInvitation":
        return t("workspace.invite_member");
      case "manageMembers":
        return t("workspace.members");
      case "workspaceInvitations":
        return t("workspace.sent_invitations");
      case "myPendingInvitations":
        return t("workspace.my_pending_invitations");
      default:
        return "";
    }
  };

  const modalWidth =
    activeModal === "manageMembers" ||
    activeModal === "workspaceInvitations" ||
    activeModal === "myPendingInvitations"
      ? "720px"
      : "480px";

  return (
    <section className="workspace-settings">
      <div className="workspace-settings__header">
        <div>
          <h3>{t("workspace.management_title")}</h3>
          <p>{t("workspace.management_description")}</p>
        </div>
      </div>

      <div className="workspace-settings__active">
        <span className="workspace-settings__label">
          {t("workspace.active_workspace")}
        </span>

        {isWorkspaceLoading ? (
          <p>{t("workspace.loading")}</p>
        ) : activeWorkspace ? (
          <div className="workspace-settings__workspace">
            <strong>{activeWorkspace.name}</strong>

            <span
              className={`workspace-settings__role workspace-settings__role--${activeRole?.toLowerCase()}`}
            >
              {activeRole}
            </span>
          </div>
        ) : (
          <p>{t("workspace.no_active_workspace")}</p>
        )}
      </div>

      <div className="workspace-settings__actions">
        <Button
          variant="primary"
          onClick={() => setActiveModal("createWorkspace")}
        >
          {t("workspace.create_workspace")}
        </Button>

        <Button
          variant="primary"
          onClick={() => setActiveModal("myPendingInvitations")}
        >
          {t("workspace.my_pending_invitations")}
        </Button>

        {canManageWorkspace && activeWorkspaceId && (
          <>
            <Button
              variant="primary"
              onClick={() => setActiveModal("createInvitation")}
            >
              {t("workspace.invite_member")}
            </Button>

            <Button
              variant="primary"
              onClick={() => setActiveModal("manageMembers")}
            >
              {t("workspace.manage_members")}
            </Button>

            <Button
              variant="primary"
              onClick={() => setActiveModal("workspaceInvitations")}
            >
              {t("workspace.sent_invitations")}
            </Button>
          </>
        )}
      </div>

      {!canManageWorkspace && activeWorkspace && (
        <div className="workspace-settings__permission-info">
          {t("workspace.owner_permission_required")}
        </div>
      )}

      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={getModalTitle(activeModal)}
        width={modalWidth}
      >
        {activeModal === "createWorkspace" && (
          <CreateWorkspaceForm
            onCancel={closeModal}
            onSuccess={handleSuccess}
          />
        )}

        {activeModal === "createInvitation" && activeWorkspaceId && (
          <CreateInvitationForm
            workspaceId={activeWorkspaceId}
            onCancel={closeModal}
            onSuccess={closeModal}
          />
        )}

        {activeModal === "manageMembers" && activeWorkspaceId && (
          <WorkspaceMembersManager />
        )}

        {activeModal === "workspaceInvitations" && <WorkspaceInvitationsList />}

        {activeModal === "myPendingInvitations" && (
          <MyPendingInvitations onSuccess={handleSuccess} />
        )}
      </Modal>
    </section>
  );
}

export default WorkspaceSettings;
