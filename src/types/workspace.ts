export type WorkspaceRole = "OWNER" | "EDITOR" | "VIEWER";

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  ownerId: string;
  role: WorkspaceRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
}
export interface UpdateWorkspacePayload {
  name?: string;
  description?: string;
}
export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  };
  role: WorkspaceRole;
  invitedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceInvitation {
  id: string;
  workspaceId?: string;
  workspace?: {
    id: string;
    name: string;
    description?: string;
    isDefault: boolean;
    ownerId: string;
  };
  email: string;
  role: Exclude<WorkspaceRole, "OWNER">;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  invitedBy: string;
  token?: string;
  expiresAt: string;
  acceptedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkspaceInvitationPayload {
  email: string;
  role: Exclude<WorkspaceRole, "OWNER">;
}

export interface UpdateWorkspaceMemberRolePayload {
  role: Exclude<WorkspaceRole, "OWNER">;
}
