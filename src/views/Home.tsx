import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "../components/Layout/Dashboard/Dashboard";
import TransactionPage from "./Transactions/TransactionPage";
import "./Home.scss";

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#transactions") {
      setTimeout(() => {
        const element = document.getElementById("transactions-section");
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }

    if (!hash) {
      const element = document.getElementById("dashboard-top");
      element?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [hash]);

  return (
    <div className="home-page">
      <section id="dashboard-top" className="home-page__section">
        <Dashboard />
      </section>

      <section id="transactions-section" className="home-page__section">
        <TransactionPage />
      </section>
    </div>
  );
}

export default Home;
