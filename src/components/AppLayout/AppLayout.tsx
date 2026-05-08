import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import "./AppLayout.scss";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
