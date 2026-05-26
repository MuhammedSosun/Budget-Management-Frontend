import { useEffect, useRef, useState, useCallback } from "react";
import SummaryCard from "./SummaryCard/SummaryCard";
import "./Dashboard.scss";
import { SpendingChart } from "./SpendingChart/SpendingChart";
import { TrendChart } from "./TrendChart/TrendChart";
import { transactionService } from "../../../services/transaction.service";
import { useLoading } from "../../../hooks/useLoading";
import { useTranslation } from "react-i18next";
import Select from "../../ui/Select/Select";
import { useWorkspace } from "../../../hooks/useWorkspace";
import {
  TRANSACTION_CHANGED_EVENT,
  TRANSACTION_CHANGED_STORAGE_KEY,
} from "../../../utils/events";

function Dashboard() {
  const { t } = useTranslation();
  const { activeWorkspace } = useWorkspace();

  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [currency, setCurrency] = useState<"TRY" | "USD" | "EUR">("TRY");
  const [chartRefreshKey, setChartRefreshKey] = useState(0);

  const isFetchingRef = useRef(false);
  const { showLoading, hideLoading } = useLoading();

  const activeWorkspaceId = activeWorkspace?.id;

  const fetchTotals = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!activeWorkspaceId) return;
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;

      try {
        if (!options?.silent) {
          showLoading(t("loading_data"));
        }

        const [incomeResponse, expenseResponse] = await Promise.all([
          transactionService.totalIncome(activeWorkspaceId, currency),
          transactionService.totalExpense(activeWorkspaceId, currency),
        ]);

        setIncome(incomeResponse.data || 0);
        setExpense(expenseResponse.data || 0);
      } catch (error) {
        console.error("Veriler çekilemedi:", error);
      } finally {
        if (!options?.silent) {
          hideLoading();
        }

        isFetchingRef.current = false;
      }
    },
    [activeWorkspaceId, currency, showLoading, hideLoading, t],
  );

  useEffect(() => {
    fetchTotals();
  }, [fetchTotals]);

  useEffect(() => {
    const handleTransactionChanged = () => {
      fetchTotals({ silent: true });
      setChartRefreshKey((prev) => prev + 1);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TRANSACTION_CHANGED_STORAGE_KEY) {
        handleTransactionChanged();
      }
    };

    window.addEventListener(
      TRANSACTION_CHANGED_EVENT,
      handleTransactionChanged,
    );

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        TRANSACTION_CHANGED_EVENT,
        handleTransactionChanged,
      );

      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchTotals]);

  const currencySymbol =
    currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€";

  if (!activeWorkspaceId) {
    return (
      <div className="dashboard">
        <p>{t("no_active_workspace")}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__title-group">
          <h2 className="dashboard__title">{t("welcome_dashboard")}</h2>

          <p className="dashboard__subtitle">
            {activeWorkspace?.name
              ? activeWorkspace.name + " " + t("workspace_overview")
              : t("loading_data")}
          </p>
        </div>

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
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(
            income - expense,
          )}`}
          type="balance"
        />

        <SummaryCard
          title={t("total_income")}
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(
            income,
          )}`}
          type="income"
        />

        <SummaryCard
          title={t("total_expense")}
          amount={`${currencySymbol} ${new Intl.NumberFormat("tr-TR").format(
            expense,
          )}`}
          type="expense"
        />
      </div>

      <div className="dashboard__charts">
        <SpendingChart
          workspaceId={activeWorkspaceId}
          currency={currency}
          refreshKey={chartRefreshKey}
        />

        <TrendChart
          workspaceId={activeWorkspaceId}
          currency={currency}
          refreshKey={chartRefreshKey}
        />
      </div>
    </div>
  );
}

export default Dashboard;
