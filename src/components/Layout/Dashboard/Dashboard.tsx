import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard/SummaryCard";
import "./Dashboard.scss";
import { SpendingChart } from "./SpendingChart/SpendingChart";
import { TrendChart } from "./TrendChart/TrendChart";
import { transactionService } from "../../../services/transaction.service";
import { useLoading } from "../../../hooks/useLoading";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const { t } = useTranslation();
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        showLoading("Total Datas are loading...");
        const [incomeResponse, expenseResponse] = await Promise.all([
          transactionService.totalIncome(),
          transactionService.totalExpense(),
        ]);
        setIncome(incomeResponse.data || 0);
        setExpense(expenseResponse.data || 0);
        window.addEventListener("refresh-dashboard", fetchTotals);
        return () =>
          window.removeEventListener("refresh-dashboard", fetchTotals);
      } catch (error) {
        console.error("Datas did not get:", error);
      } finally {
        hideLoading();
      }
    };
    fetchTotals();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard__cards">
        <SummaryCard
          title={t("total_balance")}
          amount={new Intl.NumberFormat("tr-TR").format(income - expense)}
          type="balance"
        />
        <SummaryCard
          title={t("total_income")}
          amount={new Intl.NumberFormat("tr-TR").format(income)}
          type="income"
        />
        <SummaryCard
          title={t("total_expense")}
          amount={new Intl.NumberFormat("tr-TR").format(expense)}
          type="expense"
        />
      </div>
      <div className="dashboard__charts">
        <SpendingChart />
        <TrendChart />
      </div>
    </div>
  );
}
export default Dashboard;
