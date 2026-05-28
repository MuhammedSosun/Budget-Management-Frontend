import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import Header from "../../components/Layout/Header/Header";
import MobileBottomNav from "../../components/Layout/MobileBottomNav/MobileBottomNav";
import "./AppLayout.scss";

function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={closeMobileSidebar}
      />

      {isMobileSidebarOpen && (
        <button
          type="button"
          className="app-layout__overlay"
          onClick={closeMobileSidebar}
          aria-label="Close sidebar"
        />
      )}

      <div className="app-layout__main">
        <Header onMenuClick={openMobileSidebar} />

        <main className="app-layout__content">
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}

export default AppLayout;
