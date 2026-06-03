import api from "../api";
import type {
  NotificationResponse,
  NotificationsResponse,
  UnreadNotificationCountResponse,
  MarkAllAsReadResponse,
} from "../types/notification.types";

export const getNotifications = async (params?: {
  page?: number;
  size?: number;
}) => {
  const response = await api.get<NotificationsResponse>("/notifications", {
    params,
  });

  return response.data.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await api.get<UnreadNotificationCountResponse>(
    "/notifications/unread-count",
  );

  return response.data.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const response = await api.patch<NotificationResponse>(
    `/notifications/${notificationId}/read`,
  );

  return response.data.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.patch<MarkAllAsReadResponse>(
    "/notifications/read-all",
  );

  return response.data.data;
};

export const deleteNotification = async (notificationId: string) => {
  const response = await api.delete<NotificationResponse>(
    `/notifications/${notificationId}`,
  );

  return response.data.data;
};
