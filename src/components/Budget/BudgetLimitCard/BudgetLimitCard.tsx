import Button from "../../ui/Button/Button";
import type { BudgetLimit, BudgetUsage } from "../../../types/budget-limit";
import { getCategoryIcon } from "../../../constants/categories";
import "./BudgetLimitCard.scss";
import { useTranslation } from "react-i18next";

interface BudgetLimitCardProps {
  budgetLimit: BudgetLimit;
  usage?: BudgetUsage;
  canManageBudgets: boolean;
  onEdit: (budgetLimit: BudgetLimit) => void;
  onDelete: (budgetLimit: BudgetLimit) => void;
}

const statusLabelMap = {
  SAFE: "Güvenli",
  WARNING: "Dikkat",
  EXCEEDED: "Aşıldı",
};

const formatMoney = (amount: number, currency: string) => {
  return `${amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ${currency}`;
};

const getSafePercentage = (percentage?: number) => {
  if (!percentage || Number.isNaN(percentage)) return 0;

  return Math.min(Math.max(percentage, 0), 100);
};

export const BudgetLimitCard = ({
  budgetLimit,
  usage,
  canManageBudgets,
  onEdit,
  onDelete,
}: BudgetLimitCardProps) => {
  const status = usage?.status || "SAFE";
  const usagePercentage = usage?.usagePercentage || 0;
  const progressPercentage = getSafePercentage(usagePercentage);
  const { t } = useTranslation();
  const spentAmount = usage?.spent.amount || 0;
  const remainingAmount = usage?.remaining.amount ?? budgetLimit.limit.amount;

  const currency = usage?.limit.currency || budgetLimit.limit.currency;

  return (
    <article
      className={`budget-limit-card budget-limit-card--${status.toLowerCase()}`}
    >
      <div className="budget-limit-card__top">
        <div className="budget-limit-card__identity">
          <div className="budget-limit-card__icon">
            {getCategoryIcon(budgetLimit.category)}
          </div>

          <div className="budget-limit-card__text">
            <h3 className="budget-limit-card__category">
              {budgetLimit.category}
            </h3>

            <p className="budget-limit-card__period">
              {t("budget.monthly_budget_limit")}
            </p>
          </div>
        </div>

        <span className="budget-limit-card__status">
          {statusLabelMap[status]}
        </span>
      </div>

      <div className="budget-limit-card__money-row">
        <div>
          <span className="budget-limit-card__label">{t("budget.spent")}</span>
          <strong className="budget-limit-card__amount">
            {formatMoney(spentAmount, currency)}
          </strong>
        </div>

        <div className="budget-limit-card__limit-block">
          <span className="budget-limit-card__label">{t("budget.limit")}</span>
          <strong className="budget-limit-card__amount">
            {formatMoney(budgetLimit.limit.amount, budgetLimit.limit.currency)}
          </strong>
        </div>
      </div>

      <div className="budget-limit-card__progress-area">
        <div className="budget-limit-card__progress-header">
          <span>
            %{Math.round(usagePercentage)} {t("budget.used")}
          </span>

          <span
            className={
              remainingAmount < 0
                ? "budget-limit-card__remaining budget-limit-card__remaining--negative"
                : "budget-limit-card__remaining"
            }
          >
            {remainingAmount < 0
              ? `${formatMoney(Math.abs(remainingAmount), currency)} {t("budget.exceeded")}`
              : `${formatMoney(remainingAmount, currency)} `}{" "}
            {t("budget.remaining")}
          </span>
        </div>

        <div className="budget-limit-card__progress-track">
          <div
            className="budget-limit-card__progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {canManageBudgets && (
        <div className="budget-limit-card__actions">
          <Button
            type="button"
            variant="primary"
            onClick={() => onEdit(budgetLimit)}
          >
            {t("edit")}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => onDelete(budgetLimit)}
          >
            {t("delete")}
          </Button>
        </div>
      )}
    </article>
  );
};
