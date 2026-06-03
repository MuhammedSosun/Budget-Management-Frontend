import type { Notification } from "../../types/notification.types";
import NotificationItem from "./NotificationItem";
import "./NotificationDropdown.scss";
import { useTranslation } from "react-i18next";

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  onMarkAsRead: (notificationId: string) => Promise<Notification>;
  onMarkAllAsRead: () => Promise<void>;
  onViewAll: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  isLoading,
  error,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
}: NotificationDropdownProps) {
  const { t } = useTranslation();
  const hasNotifications = notifications.length > 0;

  return (
    <div className="notification-dropdown">
      <div className="notification-dropdown__header">
        <div>
          <h3>{t("notification.title")}</h3>

          <p>
            {unreadCount > 0
              ? t("notification.unread_count", { count: unreadCount })
              : t("notification.all_up_to_date")}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            className="notification-dropdown__mark-all"
            onClick={onMarkAllAsRead}
          >
            {t("notification.mark_all_as_read")}
          </button>
        )}
      </div>

      <div className="notification-dropdown__body">
        {isLoading && (
          <div className="notification-dropdown__state">
            {t("notification.loading")}
          </div>
        )}

        {!isLoading && error && (
          <div className="notification-dropdown__state notification-dropdown__state--error">
            {error}
          </div>
        )}

        {!isLoading && !error && !hasNotifications && (
          <div className="notification-dropdown__empty">
            <span>🛎️</span>
            <strong>{t("notification.empty_title")}</strong>
            <p>{t("notification.empty_description")}</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
      </div>

      <button
        type="button"
        className="notification-dropdown__view-all"
        onClick={onViewAll}
      >
        {t("notification.view_all")}
      </button>
    </div>
  );
}
