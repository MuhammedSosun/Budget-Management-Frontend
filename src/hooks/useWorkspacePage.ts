import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { useWorkspace } from "./useWorkspace";
import { workspaceService } from "../services/workspace.service";
import type { Workspace } from "../types/workspace";

export type WorkspaceTab = "overview" | "members" | "invitations";

export type WorkspaceModal =
  | "createWorkspace"
  | "myInvitations"
  | "createInvitation"
  | "editWorkspace"
  | "deleteWorkspace"
  | "leaveWorkspace"
  | null;

export const useWorkspacesPage = () => {
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

  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );

  const [editWorkspaceName, setEditWorkspaceName] = useState("");
  const [editWorkspaceDescription, setEditWorkspaceDescription] = useState("");

  const [isDeletingWorkspace, setIsDeletingWorkspace] = useState(false);
  const [isUpdatingWorkspace, setIsUpdatingWorkspace] = useState(false);
  const [isLeavingWorkspace, setIsLeavingWorkspace] = useState(false);

  const canViewWorkspaceManagementTabs = canManageWorkspace;
  const canInviteMember = Boolean(canManageWorkspace && activeWorkspaceId);

  useEffect(() => {
    if (!canViewWorkspaceManagementTabs && activeTab !== "overview") {
      setActiveTab("overview");
    }
  }, [canViewWorkspaceManagementTabs, activeTab, activeWorkspaceId]);

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

  const openCreateWorkspaceModal = () => {
    setActiveModal("createWorkspace");
  };

  const openMyInvitationsModal = () => {
    setActiveModal("myInvitations");
  };

  const openCreateInvitationModal = () => {
    if (!canInviteMember) return;
    setActiveModal("createInvitation");
  };

  const openEditWorkspaceModal = (workspace: Workspace) => {
    if (workspace.role !== "OWNER") return;

    setSelectedWorkspace(workspace);
    setEditWorkspaceName(workspace.name);
    setEditWorkspaceDescription(workspace.description || "");
    setActiveModal("editWorkspace");
  };

  const openDeleteWorkspaceModal = (workspace: Workspace) => {
    if (workspace.isDefault || workspace.role !== "OWNER") return;

    setSelectedWorkspace(workspace);
    setActiveModal("deleteWorkspace");
  };

  const openLeaveWorkspaceModal = (workspace: Workspace) => {
    if (workspace.isDefault || workspace.role === "OWNER") return;

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

    if (selectedWorkspace.role !== "OWNER") {
      toast.error(t("workspace.only_owner_can_update_workspace"));
      closeModal();
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

    if (selectedWorkspace.role === "OWNER") {
      toast.error(t("workspace.owner_cannot_leave_workspace"));
      closeModal();
      return;
    }

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

  const getOverviewTitle = () => {
    if (!activeWorkspace) {
      return t("workspace.overview_no_workspace_title");
    }

    if (activeRole === "OWNER") {
      return t("workspace.overview_owner_title");
    }

    if (activeRole === "EDITOR") {
      return t("workspace.overview_editor_title");
    }

    if (activeRole === "VIEWER") {
      return t("workspace.overview_viewer_title");
    }

    return t("workspace.overview_ready_title");
  };

  const getOverviewDescription = () => {
    if (!activeWorkspace) {
      return t("workspace.overview_no_workspace_description");
    }

    if (activeRole === "OWNER") {
      return t("workspace.overview_owner_description");
    }

    if (activeRole === "EDITOR") {
      return t("workspace.overview_editor_description");
    }

    if (activeRole === "VIEWER") {
      return t("workspace.overview_viewer_description");
    }

    return t("workspace.overview_ready_description");
  };

  return {
    t,

    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    activeRole,
    canManageWorkspace,
    canViewWorkspaceManagementTabs,
    canInviteMember,

    activeTab,
    setActiveTab,

    activeModal,
    selectedWorkspace,

    editWorkspaceName,
    setEditWorkspaceName,
    editWorkspaceDescription,
    setEditWorkspaceDescription,

    isDeletingWorkspace,
    isUpdatingWorkspace,
    isLeavingWorkspace,

    setActiveWorkspaceById,

    closeModal,
    openCreateWorkspaceModal,
    openMyInvitationsModal,
    openCreateInvitationModal,
    openEditWorkspaceModal,
    openDeleteWorkspaceModal,
    openLeaveWorkspaceModal,

    handleWorkspaceCreateSuccess,
    handleInvitationSuccess,
    handleDeleteWorkspace,
    handleUpdateWorkspace,
    handleLeaveWorkspace,

    getOverviewTitle,
    getOverviewDescription,
  };
};
