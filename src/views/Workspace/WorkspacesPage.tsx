import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import { Modal } from "../../components/ui/Modal/Modal";
import { toast } from "sonner";
import { workspaceService } from "../../services/workspace.service";
import CreateWorkspaceForm from "../../components/workspace/CreateWorkspaceForm/CreateWorkspaceForm";
import CreateInvitationForm from "../../components/workspace/CreateInvitationForm/CreateInvitationForm";
import MyPendingInvitations from "../../components/workspace/MyPendingInvitations/MyPendingInvitations";
import WorkspaceMembersManager from "../../components/workspace/WorkspaceMembersManager/WorkspaceMembersManager";
import WorkspaceInvitationsList from "../../components/workspace/WorkspaceInvitationsList/WorkspaceInvitationsList";

import { useWorkspace } from "../../hooks/useWorkspace";
import { useTranslation } from "react-i18next";

import "./WorkspacesPage.scss";
import type { Workspace } from "../../types/workspace";

type WorkspaceTab = "overview" | "members" | "invitations" | "myInvitations";

type WorkspaceModal =
  | "createWorkspace"
  | "myInvitations"
  | "createInvitation"
  | "editWorkspace"
  | "deleteWorkspace"
  | "leaveWorkspace"
  | null;

function WorkspacesPage() {
  const {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    activeRole,
    setActiveWorkspaceById,
    canManageWorkspace,
    refreshWorkspaces,
  } = useWorkspace();

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [activeModal, setActiveModal] = useState<WorkspaceModal>(null);
  const [isDeletingWorkspace, setIsDeletingWorkspace] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  const [editWorkspaceName, setEditWorkspaceName] = useState("");
  const [editWorkspaceDescription, setEditWorkspaceDescription] = useState("");

  const [isUpdatingWorkspace, setIsUpdatingWorkspace] = useState(false);

  const [isLeavingWorkspace, setIsLeavingWorkspace] = useState(false);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedWorkspace(null);
    setEditWorkspaceName("");
    setEditWorkspaceDescription("");
  };

  const handleWorkspaceCreateSuccess = async () => {
    await refreshWorkspaces();
    closeModal();
  };

  const handleInvitationSuccess = async () => {
    await refreshWorkspaces();
    closeModal();
  };

  const openEditWorkspaceModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setEditWorkspaceName(workspace.name);
    setEditWorkspaceDescription(workspace.description || "");
    setActiveModal("editWorkspace");
  };

  const openDeleteWorkspaceModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setActiveModal("deleteWorkspace");
  };

  const openLeaveWorkspaceModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setActiveModal("leaveWorkspace");
  };
  const handleDeleteWorkspace = async () => {
    if (!selectedWorkspace) return;

    if (selectedWorkspace.isDefault) {
      toast.error(t("workspace.default_workspace_cannot_be_deleted"));
      closeModal();
      return;
    }

    if (selectedWorkspace.role !== "OWNER") {
      toast.error(t("workspace.only_owner_can_delete_workspace"));
      closeModal();
      return;
    }

    try {
      setIsDeletingWorkspace(true);

      await workspaceService.deleteWorkspace(selectedWorkspace.id);

      toast.success(t("workspace.delete_workspace_success"));

      if (activeWorkspaceId === selectedWorkspace.id) {
        const nextWorkspace = workspaces.find(
          (workspace) => workspace.id !== selectedWorkspace.id,
        );

        if (nextWorkspace) {
          setActiveWorkspaceById(nextWorkspace.id);
        }
      }

      await refreshWorkspaces();
      closeModal();
    } catch {
      toast.error(t("workspace.delete_workspace_error"));
    } finally {
      setIsDeletingWorkspace(false);
    }
  };
  const handleUpdateWorkspace = async () => {
    if (!selectedWorkspace) return;

    const trimmedName = editWorkspaceName.trim();
    const trimmedDescription = editWorkspaceDescription.trim();

    if (!trimmedName) {
      toast.error(t("workspace.name_required"));
      return;
    }

    try {
      setIsUpdatingWorkspace(true);

      await workspaceService.updateWorkspace(selectedWorkspace.id, {
        name: trimmedName,
        description: trimmedDescription,
      });

      await refreshWorkspaces();

      toast.success(t("workspace.update_success"));
      closeModal();
    } catch {
      toast.error(t("workspace.update_error"));
    } finally {
      setIsUpdatingWorkspace(false);
    }
  };

  const handleLeaveWorkspace = async () => {
    if (!selectedWorkspace) return;

    try {
      setIsLeavingWorkspace(true);

      await workspaceService.leaveWorkspace(selectedWorkspace.id);

      await refreshWorkspaces();

      toast.success(t("workspace.leave_success"));
      closeModal();
    } catch {
      toast.error(t("workspace.leave_error"));
    } finally {
      setIsLeavingWorkspace(false);
    }
  };

  return (
    <div className="workspaces-page">
      <div className="workspaces-page__inner">
        <section className="workspaces-page__hero">
          <div>
            <span className="workspaces-page__eyebrow">
              👥 {t("workspace.management_title")}
            </span>

            <h1 className="workspaces-page__title">
              {t("workspace.page_title")}
            </h1>

            <p className="workspaces-page__description">
              {t("workspace.page_description")}
            </p>
          </div>

          <div className="workspaces-page__hero-actions">
            <Button
              variant="primary"
              onClick={() => setActiveModal("createWorkspace")}
            >
              {t("workspace.create_workspace")}
            </Button>

            <Button
              variant="link"
              onClick={() => setActiveModal("myInvitations")}
            >
              {t("workspace.my_pending_invitations")}
            </Button>
            {canManageWorkspace && activeWorkspaceId && (
              <Button
                variant="link"
                onClick={() => setActiveModal("createInvitation")}
              >
                {t("workspace.invite_member")}
              </Button>
            )}
          </div>
        </section>

        <div className="workspaces-page__grid">
          <aside className="workspaces-page__sidebar">
            <div className="workspaces-page__section-header">
              <div>
                <h2>{t("workspace.workspaces")}</h2>
                <p>{t("workspace.select_workspace_description")}</p>
              </div>
            </div>

            <div className="workspaces-page__workspace-list">
              {workspaces.length === 0 ? (
                <div className="workspaces-page__empty-small">
                  {t("workspace.empty")}
                </div>
              ) : (
                workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    role="button"
                    tabIndex={0}
                    className={
                      workspace.id === activeWorkspaceId
                        ? "workspaces-page__workspace-card workspaces-page__workspace-card--active"
                        : "workspaces-page__workspace-card"
                    }
                    onClick={() => setActiveWorkspaceById(workspace.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setActiveWorkspaceById(workspace.id);
                      }
                    }}
                  >
                    <div className="workspaces-page__workspace-top">
                      <div className="workspaces-page__workspace-name">
                        <strong>{workspace.name}</strong>

                        <span
                          className={`workspaces-page__badge workspaces-page__badge--${workspace.role.toLowerCase()}`}
                        >
                          {t(`workspace.roles.${workspace.role.toLowerCase()}`)}
                        </span>
                      </div>

                      <div className="workspaces-page__workspace-actions">
                        {workspace.role === "OWNER" && (
                          <button
                            type="button"
                            className="workspaces-page__workspace-action"
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditWorkspaceModal(workspace);
                            }}
                          >
                            {t("workspace.edit")}
                          </button>
                        )}

                        {!workspace.isDefault && workspace.role === "OWNER" && (
                          <button
                            type="button"
                            className="workspaces-page__workspace-action workspaces-page__workspace-action--danger"
                            onClick={(event) => {
                              event.stopPropagation();
                              openDeleteWorkspaceModal(workspace);
                            }}
                          >
                            {t("workspace.delete")}
                          </button>
                        )}

                        {!workspace.isDefault && workspace.role !== "OWNER" && (
                          <button
                            type="button"
                            className="workspaces-page__workspace-action workspaces-page__workspace-action--danger"
                            onClick={(event) => {
                              event.stopPropagation();
                              openLeaveWorkspaceModal(workspace);
                            }}
                          >
                            {t("workspace.leave")}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="workspaces-page__workspace-desc">
                      {workspace.description || t("workspace.no_description")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </aside>

          <main className="workspaces-page__content">
            <div className="workspaces-page__section-header">
              <div>
                <h2>
                  {activeWorkspace?.name || t("workspace.no_active_workspace")}
                </h2>
                <p>{t("workspace.active_workspace_description")}</p>
              </div>

              {activeRole && (
                <span
                  className={`workspaces-page__badge workspaces-page__badge--${activeRole.toLowerCase()}`}
                >
                  {t(`workspace.roles.${activeRole.toLowerCase()}`)}
                </span>
              )}
            </div>

            <div className="workspaces-page__stats">
              <div className="workspaces-page__stat-card">
                <span>{t("workspace.total_workspace")}</span>
                <strong>{workspaces.length}</strong>
              </div>

              <div className="workspaces-page__stat-card">
                <span>{t("workspace.active_role")}</span>
                <strong>
                  {activeRole
                    ? t(`workspace.roles.${activeRole.toLowerCase()}`)
                    : "-"}
                </strong>
              </div>

              <div className="workspaces-page__stat-card">
                <span>{t("workspace.management_permission")}</span>
                <strong>
                  {canManageWorkspace
                    ? t("workspace.permission_available")
                    : t("workspace.permission_unavailable")}
                </strong>
              </div>
            </div>

            <div className="workspaces-page__tabs">
              <button
                type="button"
                className={
                  activeTab === "overview"
                    ? "workspaces-page__tab workspaces-page__tab--active"
                    : "workspaces-page__tab"
                }
                onClick={() => setActiveTab("overview")}
              >
                {t("workspace.overview")}
              </button>

              <button
                type="button"
                className={
                  activeTab === "members"
                    ? "workspaces-page__tab workspaces-page__tab--active"
                    : "workspaces-page__tab"
                }
                onClick={() => setActiveTab("members")}
              >
                {t("workspace.members")}
              </button>

              <button
                type="button"
                className={
                  activeTab === "invitations"
                    ? "workspaces-page__tab workspaces-page__tab--active"
                    : "workspaces-page__tab"
                }
                onClick={() => setActiveTab("invitations")}
              >
                {t("workspace.sent_invitations")}
              </button>

              <button
                type="button"
                className={
                  activeTab === "myInvitations"
                    ? "workspaces-page__tab workspaces-page__tab--active"
                    : "workspaces-page__tab"
                }
                onClick={() => setActiveTab("myInvitations")}
              >
                {t("workspace.my_pending_invitations")}
              </button>
            </div>

            <div className="workspaces-page__panel">
              {activeTab === "overview" && (
                <div className="workspaces-page__empty">
                  <strong>{t("workspace.overview_ready_title")}</strong>
                  <p>{t("workspace.overview_ready_description")}</p>
                </div>
              )}

              {activeTab === "members" && <WorkspaceMembersManager />}

              {activeTab === "invitations" && <WorkspaceInvitationsList />}

              {activeTab === "myInvitations" && (
                <MyPendingInvitations onSuccess={handleInvitationSuccess} />
              )}
            </div>
          </main>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "createWorkspace"}
        onClose={closeModal}
        title={t("workspace.create_workspace")}
        width="480px"
      >
        <CreateWorkspaceForm
          onCancel={closeModal}
          onSuccess={handleWorkspaceCreateSuccess}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "myInvitations"}
        onClose={closeModal}
        title={t("workspace.my_pending_invitations")}
        width="720px"
      >
        <MyPendingInvitations onSuccess={handleInvitationSuccess} />
      </Modal>

      <Modal
        isOpen={activeModal === "createInvitation"}
        onClose={closeModal}
        title={t("workspace.invite_member")}
        width="480px"
      >
        {activeWorkspaceId && (
          <CreateInvitationForm
            workspaceId={activeWorkspaceId}
            onCancel={closeModal}
            onSuccess={handleInvitationSuccess}
          />
        )}
      </Modal>
      <Modal
        isOpen={activeModal === "deleteWorkspace"}
        onClose={closeModal}
        title={t("workspace.delete_workspace")}
        width="460px"
      >
        <div className="workspaces-page__delete-modal">
          <p>{t("workspace.delete_workspace_confirm")}</p>

          {selectedWorkspace && <strong>{selectedWorkspace.name}</strong>}

          <div className="workspaces-page__delete-actions">
            <Button
              variant="link"
              onClick={closeModal}
              disabled={isDeletingWorkspace}
            >
              {t("no_delete")}
            </Button>

            <Button
              variant="danger"
              onClick={handleDeleteWorkspace}
              disabled={isDeletingWorkspace}
            >
              {isDeletingWorkspace
                ? t("workspace.deleting")
                : t("workspace.delete")}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={activeModal === "editWorkspace"}
        onClose={closeModal}
        title={t("workspace.edit_workspace")}
        width="480px"
      >
        <div className="workspaces-page__edit-modal">
          <label className="workspaces-page__form-group">
            <span>{t("workspace.name")}</span>

            <input
              type="text"
              value={editWorkspaceName}
              onChange={(event) => setEditWorkspaceName(event.target.value)}
              placeholder={t("workspace.name")}
            />
          </label>

          <label className="workspaces-page__form-group">
            <span>{t("workspace.description")}</span>

            <textarea
              value={editWorkspaceDescription}
              onChange={(event) =>
                setEditWorkspaceDescription(event.target.value)
              }
              placeholder={t("workspace.description")}
              rows={4}
            />
          </label>

          <div className="workspaces-page__modal-actions">
            <Button
              variant="link"
              onClick={closeModal}
              disabled={isUpdatingWorkspace}
            >
              {t("no_delete")}
            </Button>

            <Button
              variant="primary"
              onClick={handleUpdateWorkspace}
              disabled={isUpdatingWorkspace}
            >
              {isUpdatingWorkspace
                ? t("workspace.updating")
                : t("workspace.save_changes")}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={activeModal === "leaveWorkspace"}
        onClose={closeModal}
        title={t("workspace.leave_workspace")}
        width="460px"
      >
        <div className="workspaces-page__delete-modal">
          <p>{t("workspace.leave_workspace_confirm")}</p>

          {selectedWorkspace && <strong>{selectedWorkspace.name}</strong>}

          <div className="workspaces-page__delete-actions">
            <Button
              variant="link"
              onClick={closeModal}
              disabled={isLeavingWorkspace}
            >
              {t("no_delete")}
            </Button>

            <Button
              variant="danger"
              onClick={handleLeaveWorkspace}
              disabled={isLeavingWorkspace}
            >
              {isLeavingWorkspace
                ? t("workspace.leaving")
                : t("workspace.leave")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WorkspacesPage;
