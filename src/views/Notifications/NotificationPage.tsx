import { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import NotificationItem from "../../components/Notifications/NotificationItem";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../services/notification.service";
import type { Notification } from "../../types/notification.types";
import { notifyNotificationsChanged } from "../../utils/notificationEvents";
import "./NotificationPage.scss";

type NotificationFilter = "all" | "unread" | "read";

const PAGE_SIZE = 8;

export default function NotificationsPage() {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");

  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter((notification) => !notification.isRead);
    }

    if (activeFilter === "read") {
      return notifications.filter((notification) => notification.isRead);
    }

    return notifications;
  }, [notifications, activeFilter]);

  const fetchPageData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [notificationResult, unreadResult] = await Promise.all([
        getNotifications({
          page: currentPage,
          size: PAGE_SIZE,
        }),
        getUnreadNotificationCount(),
      ]);

      setNotifications(notificationResult.content);
      setCurrentPage(notificationResult.currentPage);
      setTotalPages(notificationResult.totalPages || 1);
      setTotalElements(notificationResult.totalElements);
      setUnreadCount(unreadResult.unreadCount);
    } catch {
      setError(t("notification.error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [currentPage, t]);

  const handleMarkAsRead = async (notificationId: string) => {
    const currentNotification = notifications.find(
      (notification) => notification._id === notificationId,
    );

    const updatedNotification = await markNotificationAsRead(notificationId);

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification._id === notificationId
          ? updatedNotification
          : notification,
      ),
    );

    if (currentNotification && !currentNotification.isRead) {
      setUnreadCount((currentCount) => Math.max(currentCount - 1, 0));
    }

    notifyNotificationsChanged();

    return updatedNotification;
  };
  const handleMarkAllAsRead = async () => {
    try {
      setIsActionLoading(true);

      await markAllNotificationsAsRead();

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          isRead: true,
          readAt: notification.readAt ?? new Date().toISOString(),
        })),
      );

      setUnreadCount(0);
      notifyNotificationsChanged();
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRefresh = async () => {
    await fetchPageData();
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <main className="notifications-page">
      <section className="notifications-page__hero">
        <div className="notifications-page__hero-content">
          <span className="notifications-page__eyebrow">
            {t("notification.eyebrow")}
          </span>

          <h1>{t("notification.title")}</h1>

          <p>{t("notification.description")}</p>
        </div>

        <div className="notifications-page__actions">
          <button
            type="button"
            className="notifications-page__secondary-button"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw size={17} />
            {t("notification.refresh")}
          </button>

          <button
            type="button"
            className="notifications-page__primary-button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || isActionLoading}
          >
            {t("notification.mark_all_as_read")}
          </button>
        </div>
      </section>

      <section className="notifications-page__summary">
        <article className="notifications-page__summary-card">
          <span>{t("notification.total_notifications")}</span>
          <strong>{totalElements}</strong>
        </article>

        <article className="notifications-page__summary-card notifications-page__summary-card--highlight">
          <span>{t("notification.unread")}</span>
          <strong>{unreadCount}</strong>
        </article>

        <article className="notifications-page__summary-card">
          <span>{t("notification.page")}</span>
          <strong>
            {currentPage}/{totalPages}
          </strong>
        </article>
      </section>

      <section className="notifications-page__panel">
        <div className="notifications-page__toolbar">
          <div className="notifications-page__filters">
            <button
              type="button"
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => setActiveFilter("all")}
            >
              {t("notification.all")}
            </button>

            <button
              type="button"
              className={activeFilter === "unread" ? "active" : ""}
              onClick={() => setActiveFilter("unread")}
            >
              {t("notification.unread_filter")}
            </button>

            <button
              type="button"
              className={activeFilter === "read" ? "active" : ""}
              onClick={() => setActiveFilter("read")}
            >
              {t("notification.read_filter")}
            </button>
          </div>
        </div>

        <div className="notifications-page__list">
          {isLoading && (
            <div className="notifications-page__state">
              {t("notification.loading")}
            </div>
          )}

          {!isLoading && error && (
            <div className="notifications-page__state notifications-page__state--error">
              {error}
            </div>
          )}

          {!isLoading && !error && filteredNotifications.length === 0 && (
            <div className="notifications-page__empty">
              <span>🛎️</span>
              <h3>{t("notification.empty_title")}</h3>
              <p>{t("notification.empty_description")}</p>
            </div>
          )}

          {!isLoading &&
            !error &&
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
        </div>

        {totalPages > 1 && (
          <div className="notifications-page__pagination">
            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
            >
              {t("notification.previous")}
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
            >
              {t("notification.next")}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
