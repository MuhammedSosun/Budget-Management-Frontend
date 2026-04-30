import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard/SummaryCard";
import "./Dashboard.scss";
import { SpendingChart } from "./SpendingChart/SpendingChart";
import { TrendChart } from "./TrendChart/TrendChart";
import { transactionService } from "../../../services/transaction.service";
import { useLoading } from "../../../hooks/useLoading";
import { useTranslation } from "react-i18next";
import Select from "../../ui/Select/Select";
function Dashboard() {
  const { t } = useTranslation();
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [currency, setCurrency] = useState<"TRY" | "USD" | "EUR">("TRY");
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        showLoading(t("loading_data"));
        const [incomeResponse, expenseResponse] = await Promise.all([
          transactionService.totalIncome(currency),
          transactionService.totalExpense(currency),
        ]);
        setIncome(incomeResponse.data || 0);
        setExpense(expenseResponse.data || 0);
      } catch (error) {
        console.error("Veriler çekilemedi:", error);
      } finally {
        hideLoading();
      }
    };

    fetchTotals();
    const handleRefresh = () => fetchTotals();
    window.addEventListener("refresh-dashboard", handleRefresh);

    return () => {
      window.removeEventListener("refresh-dashboard", handleRefresh);
    };
  }, [currency, t, showLoading, hideLoading]);
  const currencySymbol =
    currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€";
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h2 className="dashboard__title">{t("welcome_dashboard")}</h2>
        <div className="dashboard__currency-wrapper">
          <Select
            label={t("currency_label")}
            value={currency}
            options={[
              { label: "₺ TRY", value: "TRY" },
              { label: "$ USD", value: "USD" },
              { label: "€ EUR", value: "EUR" },
            ]}
            onChange={(val) => setCurrency(val as "TRY" | "USD" | "EUR")}
          />
        </div>
      </div>

      <div className="dashboard__cards">
        <SummaryCard
          title={t("total_balance")}
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(income - expense)}`}
          type="balance"
        />
        <SummaryCard
          title={t("total_income")}
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(income)}`}
          type="income"
        />
        <SummaryCard
          title={t("total_expense")}
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(expense)}`}
          type="expense"
        />
      </div>

      <div className="dashboard__charts">
        <SpendingChart currency={currency} />
        <TrendChart currency={currency} />
      </div>
    </div>
  );
}

export default Dashboard;
