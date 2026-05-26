export type WorkspaceEventType =
  | "transaction:created"
  | "transaction:updated"
  | "transaction:deleted"
  | "workspace:updated"
  | "workspace:deleted"
  | "member:updated"
  | "member:removed"
  | "invitation:created";

export interface WorkspaceEventPayload<T = unknown> {
  type: WorkspaceEventType;
  workspaceId: string;
  actorUserId?: string;
  targetUserId?: string;
  data?: T;
  occurredAt?: string;
}
