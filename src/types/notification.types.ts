export type NotificationType =
  | "BUDGET_LIMIT_WARNING"
  | "BUDGET_LIMIT_EXCEEDED"
  | "BUDGET_LIMIT_CREATED"
  | "BUDGET_LIMIT_UPDATED"
  | "BUDGET_LIMIT_DELETED"
  | "TRANSACTION_CREATED"
  | "TRANSACTION_UPDATED"
  | "TRANSACTION_DELETED"
  | "WORKSPACE_MEMBER_JOINED"
  | "WORKSPACE_MEMBER_REMOVED"
  | "WORKSPACE_MEMBER_LEFT"
  | "WORKSPACE_MEMBER_ROLE_UPDATED"
  | "WORKSPACE_INVITATION_CREATED"
  | "WORKSPACE_INVITATION_ACCEPTED"
  | "WORKSPACE_INVITATION_REJECTED";

export interface Notification {
  _id: string;
  userId: string;
  workspaceId?: string;
  type: NotificationType;

  titleKey: string;
  messageKey: string;
  messageParams?: Record<string, unknown>;

  isRead: boolean;
  readAt?: string;
  metadata?: Record<string, unknown>;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedNotifications {
  content: Notification[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface NotificationsResponse {
  message: string;
  data: PaginatedNotifications;
}

export interface UnreadNotificationCountResponse {
  message: string;
  data: {
    unreadCount: number;
  };
}

export interface NotificationResponse {
  message: string;
  data: Notification;
}

export interface MarkAllAsReadResponse {
  message: string;
  data: {
    modifiedCount?: number;
  };
}
