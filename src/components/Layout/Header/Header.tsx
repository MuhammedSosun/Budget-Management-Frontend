import { useNavigate } from "react-router-dom";
import "./header.scss";
import logo from "../../../../public/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../../ui/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import "./Header.scss";
function Header() {
  const navigate = useNavigate();
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
                Dashboard
              </Button>
              <Button variant="link" onClick={() => navigate("/transactions")}>
                Transactions
              </Button>
            </>
          ) : (
            <>
              <Button variant="link">Features</Button>
              <Button variant="link">How It Works</Button>
            </>
          )}
        </div>
        <div className="main-header__divider"></div>
        <div className="main-header__settings">
          <select className="main-header__select">
            <option value="tr">TR</option>
            <option value="en">EN</option>
          </select>

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
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="link" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
