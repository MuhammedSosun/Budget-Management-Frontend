import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./ Sidebar.scss";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/home",
    icon: "▦",
  },
  {
    label: "Transactions",
    path: "/home#transactions",
    icon: "▤",
  },
  {
    label: "Setting",
    path: "/settings",
    icon: "◉",
  },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleTransactionsClick = () => {
    navigate("/home#transactions");

    setTimeout(() => {
      const element = document.getElementById("transactions-section");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <h1 className="sidebar__logo">Bütçem.</h1>
        <p className="sidebar__subtitle">Budget Management</p>
      </div>

      <nav className="sidebar__nav">
        {sidebarItems.map((item) => {
          if (item.path === "/home#transactions") {
            return (
              <button
                key={item.label}
                type="button"
                className="sidebar__link sidebar__link--button"
                onClick={handleTransactionsClick}
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar__link sidebar__link--active"
                  : "sidebar__link"
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button type="button" className="sidebar__logout" onClick={logout}>
          <span className="sidebar__icon">↩</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
