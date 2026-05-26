import { useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../../../public/logo.png";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../../ui/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const themeData = useContext(ThemeContext);

  if (!themeData) return null;

  const currentLanguage = i18n.language?.startsWith("tr") ? "tr" : "en";

  const handleLanguageChange = (language: "tr" | "en") => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  return (
    <header className="main-header">
      <div className="main-header__left">
        {user && (
          <button
            type="button"
            className="main-header__menu-btn"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <span />
            <span />
            <span />
          </button>
        )}

        {!user && (
          <button
            type="button"
            className="main-header__brand-button"
            onClick={() => navigate("/login")}
          >
            <img src={logo} alt="Budget Logo" />
            <div className="main-header__brand">Budget Management</div>
          </button>
        )}
      </div>

      <div className="main-header__right">
        <div className="main-header__settings">
          <div
            className="main-header__language-toggle"
            aria-label="Language switcher"
          >
            <button
              type="button"
              className={currentLanguage === "tr" ? "active" : ""}
              onClick={() => handleLanguageChange("tr")}
            >
              TR
            </button>

            <button
              type="button"
              className={currentLanguage === "en" ? "active" : ""}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="main-header__theme-btn"
            onClick={() =>
              themeData.setTheme(themeData.theme === "light" ? "dark" : "light")
            }
            aria-label="Toggle theme"
          >
            {themeData.theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="main-header__auth">
          {user ? (
            <div className="main-header__profile-zone">
              <button
                type="button"
                className={`main-header__user-trigger ${
                  isDropdownOpen ? "active" : ""
                }`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <img
                  src={
                    user.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
                  }
                  alt="Profile"
                  className="main-header__avatar"
                />

                <span className="main-header__username">{user.firstName}</span>
                <span className="main-header__arrow">▾</span>
              </button>

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
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/settings");
                    }}
                  >
                    {t("settings")}
                  </button>

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                  >
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
