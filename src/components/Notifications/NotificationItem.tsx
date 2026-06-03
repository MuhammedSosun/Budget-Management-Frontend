import {
  AlertTriangle,
  Bell,
  CreditCard,
  PiggyBank,
  UserPlus,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type {
  Notification,
  NotificationType,
} from "../../types/notification.types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => Promise<Notification>;
}

const getNotificationIcon = (type: NotificationType) => {
  if (type === "BUDGET_LIMIT_WARNING" || type === "BUDGET_LIMIT_EXCEEDED") {
    return <AlertTriangle size={18} />;
  }

  if (
    type === "BUDGET_LIMIT_CREATED" ||
    type === "BUDGET_LIMIT_UPDATED" ||
    type === "BUDGET_LIMIT_DELETED"
  ) {
    return <PiggyBank size={18} />;
  }

  if (
    type === "TRANSACTION_CREATED" ||
    type === "TRANSACTION_UPDATED" ||
    type === "TRANSACTION_DELETED"
  ) {
    return <CreditCard size={18} />;
  }

  if (
    type === "WORKSPACE_INVITATION_CREATED" ||
    type === "WORKSPACE_INVITATION_ACCEPTED" ||
    type === "WORKSPACE_INVITATION_REJECTED"
  ) {
    return <UserPlus size={18} />;
  }

  if (
    type === "WORKSPACE_MEMBER_JOINED" ||
    type === "WORKSPACE_MEMBER_REMOVED" ||
    type === "WORKSPACE_MEMBER_LEFT" ||
    type === "WORKSPACE_MEMBER_ROLE_UPDATED"
  ) {
    return <Users size={18} />;
  }

  return <Bell size={18} />;
};

const getRelativeTime = (
  date: string,
  t: (key: string, options?: Record<string, unknown>) => string,
  language: string,
) => {
  const now = Date.now();
  const notificationDate = new Date(date).getTime();

  const diffInSeconds = Math.floor((now - notificationDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return t("notification.time_just_now");
  }

  if (diffInMinutes < 60) {
    return t("notification.time_minutes_ago", { count: diffInMinutes });
  }

  if (diffInHours < 24) {
    return t("notification.time_hours_ago", { count: diffInHours });
  }

  if (diffInDays < 7) {
    return t("notification.time_days_ago", { count: diffInDays });
  }

  return new Date(date).toLocaleDateString(
    language?.startsWith("tr") ? "tr-TR" : "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
};

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const { t, i18n } = useTranslation();

  const handleClick = async () => {
    if (notification.isRead) return;

    await onMarkAsRead(notification._id);
  };

  return (
    <button
      type="button"
      className={`notification-item ${
        !notification.isRead ? "notification-item--unread" : ""
      }`}
      onClick={handleClick}
    >
      <span className="notification-item__icon">
        {getNotificationIcon(notification.type)}
      </span>

      <span className="notification-item__content">
        <span className="notification-item__top">
          <strong>
            {t(notification.titleKey, notification.messageParams)}
          </strong>

          <time dateTime={notification.createdAt}>
            {getRelativeTime(notification.createdAt, t, i18n.language)}
          </time>
        </span>

        <span className="notification-item__message">
          {t(notification.messageKey, notification.messageParams)}
        </span>
      </span>

      {!notification.isRead && (
        <span
          className="notification-item__unread-dot"
          aria-label={t("notification.unread_aria_label")}
        />
      )}
    </button>
  );
}
