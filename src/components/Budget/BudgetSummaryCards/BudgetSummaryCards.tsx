import { useTranslation } from "react-i18next";
import type { BudgetSummary } from "../../../types/budget-limit";
import "./BudgetSummaryCards.scss";

interface BudgetSummaryCardsProps {
  summary: BudgetSummary | null;
  isLoading?: boolean;
}

const formatMoney = (amount: number, currency: string) => {
  return `${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ${currency}`;
};

const getOverallStatus = (percentage: number) => {
  if (percentage >= 100) return "exceeded";
  if (percentage >= 80) return "warning";

  return "safe";
};

export const BudgetSummaryCards = ({
  summary,
  isLoading = false,
}: BudgetSummaryCardsProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="budget-summary">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="budget-summary__card budget-summary__card--skeleton"
          >
            <div className="budget-summary__skeleton budget-summary__skeleton--label" />
            <div className="budget-summary__skeleton budget-summary__skeleton--value" />
            <div className="budget-summary__skeleton budget-summary__skeleton--meta" />
          </div>
        ))}
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="budget-summary">
        <div className="budget-summary__empty">
          <h3 className="budget-summary__empty-title">
            {t("budget.empty_title")}
          </h3>
          <p className="budget-summary__empty-text">
            {t("budget.empty_description")}
          </p>
        </div>
      </section>
    );
  }

  const overallStatus = getOverallStatus(summary.overallUsagePercentage);

  return (
    <section className="budget-summary">
      <article className="budget-summary__card">
        <div className="budget-summary__icon">🎯</div>

        <div className="budget-summary__content">
          <span className="budget-summary__label">
            {t("budget.total_limit")}
          </span>

          <strong className="budget-summary__value">
            {formatMoney(
              summary.totalLimit.amount,
              summary.totalLimit.currency,
            )}
          </strong>

          <span className="budget-summary__meta">
            {t("budget.category_limit_count", {
              count: summary.totalBudgetLimits,
            })}
          </span>
        </div>
      </article>

      <article className="budget-summary__card">
        <div className="budget-summary__icon">💸</div>

        <div className="budget-summary__content">
          <span className="budget-summary__label">{t("budget.spent")}</span>

          <strong className="budget-summary__value">
            {formatMoney(
              summary.totalSpent.amount,
              summary.totalSpent.currency,
            )}
          </strong>

          <span className="budget-summary__meta">
            {t("budget.monthly_total_spending")}
          </span>
        </div>
      </article>

      <article className="budget-summary__card">
        <div className="budget-summary__icon">🪙</div>

        <div className="budget-summary__content">
          <span className="budget-summary__label">{t("budget.remaining")}</span>

          <strong className="budget-summary__value">
            {formatMoney(
              summary.totalRemaining.amount,
              summary.totalRemaining.currency,
            )}
          </strong>

          <span className="budget-summary__meta">
            {t("budget.available_budget_area")}
          </span>
        </div>
      </article>

      <article
        className={`budget-summary__card budget-summary__card--full-width budget-summary__card--${overallStatus}`}
      >
        <div className="budget-summary__icon">📊</div>

        <div className="budget-summary__content">
          <span className="budget-summary__label">
            {t("budget.overall_usage")}
          </span>

          <strong className="budget-summary__value">
            %{Math.round(summary.overallUsagePercentage)}
          </strong>

          <div className="budget-summary__progress">
            <div
              className="budget-summary__progress-fill"
              style={{
                width: `${Math.min(summary.overallUsagePercentage, 100)}%`,
              }}
            />
          </div>

          <div className="budget-summary__status-list">
            <span className="budget-summary__status budget-summary__status--safe">
              {t("budget.status_safe", { count: summary.safeCount })}
            </span>

            <span className="budget-summary__status budget-summary__status--warning">
              {t("budget.status_warning", { count: summary.warningCount })}
            </span>

            <span className="budget-summary__status budget-summary__status--exceeded">
              {t("budget.status_exceeded", { count: summary.exceededCount })}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
};
