import { useCallback, useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notification.service";
import type { Notification } from "../types/notification.types";
import { useTranslation } from "react-i18next";

interface UseNotificationsOptions {
  pageSize?: number;
  autoFetch?: boolean;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { pageSize = 5, autoFetch = true } = options;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isUnreadLoading, setIsUnreadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getNotifications({
        page: 1,
        size: pageSize,
      });

      setNotifications(result.content);
    } catch {
      setError(t("notification.general_error"));
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      setIsUnreadLoading(true);

      const result = await getUnreadNotificationCount();

      setUnreadCount(result.unreadCount);
    } catch {
      setUnreadCount(0);
    } finally {
      setIsUnreadLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    const updatedNotification = await markNotificationAsRead(notificationId);

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification._id === notificationId
          ? updatedNotification
          : notification,
      ),
    );

    setUnreadCount((currentCount) => Math.max(currentCount - 1, 0));

    return updatedNotification;
  }, []);

  const markAllAsRead = useCallback(async () => {
    await markAllNotificationsAsRead();

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
        readAt: notification.readAt ?? new Date().toISOString(),
      })),
    );

    setUnreadCount(0);
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([fetchNotifications(), fetchUnreadCount()]);
  }, [fetchNotifications, fetchUnreadCount]);

  useEffect(() => {
    if (!autoFetch) return;

    refresh();
  }, [autoFetch, refresh]);

  return {
    notifications,
    unreadCount,
    isLoading,
    isUnreadLoading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    refresh,
  };
}
