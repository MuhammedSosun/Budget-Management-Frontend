import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import Dashboard from "../components/Layout/Dashboard/Dashboard";
import TransactionPage from "./Transactions/TransactionPage";
import "./Home.scss";

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#transactions") {
      setTimeout(() => {
        const element = document.getElementById("transactions-section");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [hash]);

  return (
    <div className="home-page" id="dashboard-top">
      <Header />

      <Dashboard />

      <div id="transactions-section">
        <TransactionPage />
      </div>
    </div>
  );
}

export default Home;
