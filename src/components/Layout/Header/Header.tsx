import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../../../public/logo.png";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../../ui/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Select from "../../ui/Select/Select";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const themeData = useContext(ThemeContext);
  const handleDashboardClick = () => {
    if (location.pathname === "/home") {
      const element = document.getElementById("dashboard-top");
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/home");
    }
  };
  const handleTransactionsClick = () => {
    if (location.pathname === "/home") {
      const element = document.getElementById("transactions-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/home#transactions");
    }
  };
  if (!themeData) return null;
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <header className="main-header">
      <div className="main-header__left">
        <img src={logo} alt="Budget Logo" />
        <div className="main-header__brand">Budget Management</div>
      </div>

      <div className="main-header__right">
        <div className="main-header__nav">
          {user ? (
            <>
              <Button variant="link" onClick={handleDashboardClick}>
                {t("dashboard")}
              </Button>
              <Button variant="link" onClick={handleTransactionsClick}>
                {t("transactions")}
              </Button>
            </>
          ) : (
            <>
              <Button variant="link">{t("nav.features")}</Button>
              <Button variant="link">{t("nav.how_it_works")}</Button>
            </>
          )}
        </div>
        <div className="main-header__divider"></div>
        <div className="main-header__settings">
          <Select
            label=""
            options={[
              { label: "Türkçe", value: "tr" },
              { label: "English", value: "en" },
            ]}
            value={i18n.language}
            onChange={(val) => i18n.changeLanguage(val)}
          />

          <button
            className="main-header__theme-btn"
            onClick={() =>
              themeData.setTheme(themeData.theme === "light" ? "dark" : "light")
            }
          >
            {themeData.theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="main-header__auth">
          {user ? (
            <div className="main-header__profile-zone">
              <div
                className={`main-header__user-trigger ${isDropdownOpen ? "active" : ""}`}
                onClick={toggleDropdown}
              >
                <img
                  src={
                    user.avatarUrl ||
                    "https://ui-avatars.com/api/?name=" + user.firstName
                  }
                  alt="Profile"
                  className="main-header__avatar"
                />
                <span className="main-header__username">{user.firstName}</span>
                <span className="main-header__arrow">▾</span>
              </div>

              {isDropdownOpen && (
                <div className="main-header__dropdown">
                  <div className="dropdown-info">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <small>{user.email}</small>
                  </div>
                  <hr />
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    {t("profile")}
                  </button>
                  <button className="dropdown-item logout" onClick={logout}>
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="main-header__auth-buttons">
              <Button variant="link" onClick={() => navigate("/login")}>
                {t("login")}
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                {t("register")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
