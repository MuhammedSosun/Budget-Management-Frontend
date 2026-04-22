import { useNavigate } from "react-router-dom";
import "./header.scss";
import logo from "../../../../public/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../../ui/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import "./Header.scss";
import { useTranslation } from "react-i18next";
import Select from "../../ui/Select/Select";
function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const themeData = useContext(ThemeContext);
  if (!themeData) return null;
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
              <Button variant="link" onClick={() => navigate("/home")}>
                {t("dashboard")}
              </Button>
              <Button variant="link" onClick={() => navigate("/transactions")}>
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
            <div className="main-header__user-info">
              <span className="main-header__username">{user.firstName}</span>
              <Button variant="primary" onClick={logout}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <>
              <Button variant="link" onClick={() => navigate("/login")}>
                {t("login")}
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                {t("register")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
