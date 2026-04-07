import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard/SummaryCard";
import "./Dashboard.scss";
import { SpendingChart } from "../SpendingChart/SpendingChart";
import { TrendChart } from "./TrendChart/TrendChart";
import { transactionService } from "../../../services/transaction.service";
import { useLoading } from "../../../hooks/useLoading";
function Dashboard() {
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
          title="Toplam Bakiye"
          amount={income - expense}
          type="balance"
        />
        <SummaryCard title="Toplam Gelir" amount={income} type="income" />
        <SummaryCard title="Toplam Gider" amount={expense} type="expense" />
      </div>
      <div className="dashboard__charts">
        <SpendingChart />
        <TrendChart />
      </div>
    </div>
  );
}
export default Dashboard;
