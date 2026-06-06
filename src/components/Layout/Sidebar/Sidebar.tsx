import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./Sidebar.scss";
import WorkspaceSwitcher from "../../workspace/WorkspaceSwitcher/WorkspaceSwitcher";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const { logout } = useAuth();

  const { t } = useTranslation();

  const sidebarItems = [
    {
      label: t("dashboard"),
      path: "/home",
      icon: "▦",
    },
    {
      label: t("transactions"),
      path: "/transactions",
      icon: "▤",
    },
    {
      label: "Budgets",
      path: "/budgets",
      icon: "🎯",
    },
    {
      label: "AI Review",
      path: "/ai-review",
      icon: "🤖",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      label: t("workspace.workspaces"),
      path: "/workspace",
      icon: "👥",
    },
    {
      label: t("settings"),
      path: "/settings",
      icon: "⚙️",
    },
  ];

  const handleLogout = () => {
    onCloseMobile?.();
    logout();
  };

  return (
    <aside
      className={isMobileOpen ? "sidebar sidebar--mobile-open" : "sidebar"}
    >
      <div className="sidebar__brand">
        <div className="sidebar__brand-top">
          <div>
            <h1 className="sidebar__logo">Bütçem.</h1>
            <p className="sidebar__subtitle">Budget Management</p>
          </div>

          <button
            type="button"
            className="sidebar__close"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="sidebar__workspace">
          <WorkspaceSwitcher variant="compact" />
        </div>
      </div>

      <nav className="sidebar__nav">
        {sidebarItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                isActive
                  ? "sidebar__link sidebar__link--active"
                  : "sidebar__link"
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          <span className="sidebar__icon">↩</span>
          <span className="sidebar__label">{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
