import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./MobileBottomNav.scss";

function MobileBottomNav() {
  const { t } = useTranslation();
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `mobile-bottom-nav__item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-nav__icon">⌂</span>
        <span className="mobile-bottom-nav__label">{t("dashboard")}</span>
      </NavLink>

      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          `mobile-bottom-nav__item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-nav__icon">≡</span>
        <span className="mobile-bottom-nav__label">{t("transactions")}</span>
      </NavLink>

      <NavLink
        to="/workspace"
        className={({ isActive }) =>
          `mobile-bottom-nav__item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-nav__icon">▦</span>
        <span className="mobile-bottom-nav__label">
          {t("workspace.workspaces")}
        </span>
      </NavLink>

      <NavLink
        to="/budgets"
        className={({ isActive }) =>
          `mobile-bottom-nav__item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-nav__icon">◉</span>
        <span className="mobile-bottom-nav__label">{t("budgets")}</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `mobile-bottom-nav__item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-nav__icon">♙</span>
        <span className="mobile-bottom-nav__label">{t("profile.profile")}</span>
      </NavLink>
    </nav>
  );
}

export default MobileBottomNav;
