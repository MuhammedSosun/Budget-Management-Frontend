import api from "../api";
import {
  type CreateWorkspacePayload,
  type UpdateWorkspaceMemberRolePayload,
} from "../types/workspace";

export const workspaceService = {
  getMyWorkspaces: async () => {
    const response = await api.get("/workspaces");

    return response.data;
  },

  createWorkspace: async (data: CreateWorkspacePayload) => {
    const response = await api.post("/workspaces", data);

    return response.data;
  },

  getMyPendingInvitations: async () => {
    const response = await api.get("/workspaces/invitations/my");

    return response.data;
  },

  acceptInvitation: async (token: string) => {
    const response = await api.post(`/workspaces/invitations/${token}/accept`);

    return response.data;
  },

  rejectInvitation: async (token: string) => {
    const response = await api.post(`/workspaces/invitations/${token}/reject`);

    return response.data;
  },

  getWorkspaceMembers: async (workspaceId: string) => {
    const response = await api.get(`/workspaces/${workspaceId}/members`);

    return response.data;
  },

  updateWorkspaceMemberRole: async (
    workspaceId: string,
    memberId: string,
    data: UpdateWorkspaceMemberRolePayload,
  ) => {
    const response = await api.patch(
      `/workspaces/${workspaceId}/members/${memberId}`,
      data,
    );

    return response.data;
  },

  removeWorkspaceMember: async (workspaceId: string, memberId: string) => {
    const response = await api.delete(
      `/workspaces/${workspaceId}/members/${memberId}`,
    );

    return response.data;
  },

  createInvitation: async (
    workspaceId: string,
    data: {
      email: string;
      role: "EDITOR" | "VIEWER";
    },
  ) => {
    const response = await api.post(
      `/workspaces/${workspaceId}/invitations`,
      data,
    );

    return response.data;
  },

  getWorkspaceInvitations: async (workspaceId: string) => {
    const response = await api.get(`/workspaces/${workspaceId}/invitations`);

    return response.data;
  },
};
