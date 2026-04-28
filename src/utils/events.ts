export const refreshDashboard = () => {
  window.dispatchEvent(new Event("refresh-dashboard"));
};
