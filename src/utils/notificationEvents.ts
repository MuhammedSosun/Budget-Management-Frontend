export const NOTIFICATIONS_CHANGED_EVENT = "notifications:changed";

export const notifyNotificationsChanged = () => {
  window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
};
