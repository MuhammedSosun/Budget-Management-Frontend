import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";
import { NOTIFICATIONS_CHANGED_EVENT } from "../../utils/notificationEvents";
import "./NotificationBell.scss";

function formatUnreadCount(count: number) {
  if (count > 99) return "99+";
  return count.toString();
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refresh,
  } = useNotifications({
    pageSize: 5,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleNotificationsChanged = () => {
      refresh();
    };

    window.addEventListener(
      NOTIFICATIONS_CHANGED_EVENT,
      handleNotificationsChanged,
    );

    return () => {
      window.removeEventListener(
        NOTIFICATIONS_CHANGED_EVENT,
        handleNotificationsChanged,
      );
    };
  }, [refresh]);
  const handleToggle = async () => {
    setIsOpen((current) => !current);

    if (!isOpen) {
      await refresh();
    }
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate("/notifications");
  };

  return (
    <div className="notification-bell" ref={wrapperRef}>
      <button
        type="button"
        className={`notification-bell__button ${
          isOpen ? "notification-bell__button--active" : ""
        }`}
        onClick={handleToggle}
        aria-label="Bildirimler"
      >
        <Bell size={21} />

        {unreadCount > 0 && (
          <span className="notification-bell__badge">
            {formatUnreadCount(unreadCount)}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          isLoading={isLoading}
          error={error}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  );
}
