import { useMemo, useState } from "react";
import { Modal } from "../../components/ui/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Select from "../../components/ui/Select/Select";
import { BudgetSummaryCards } from "../../components/Budget/BudgetSummaryCards/BudgetSummaryCards";
import { BudgetLimitCard } from "../../components/Budget/BudgetLimitCard/BudgetLimitCard";
import { BudgetLimitForm } from "../../components/Budget/BudgetLimitForm/BudgetLimitForm";
import { useBudgetLimits } from "../../hooks/useBudgetLimits";
import type {
  BudgetLimit,
  CreateBudgetLimitPayload,
  CurrencyCode,
  UpdateBudgetLimitPayload,
} from "../../types/budget-limit";
import "./BudgetsPage.scss";
import { useTranslation } from "react-i18next";

const currencyOptions = [
  { label: "TRY", value: "TRY" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
];

function BudgetPage() {
  const {
    budgetLimits,
    budgetSummary,
    usageByLimitId,
    selectedMonth,
    setSelectedMonth,
    currency,
    setCurrency,
    isLoading,
    isActionLoading,
    canViewBudgets,
    canManageBudgets,
    createBudgetLimit,
    updateBudgetLimit,
    deleteBudgetLimit,
  } = useBudgetLimits();
  const [budgetLimitToDelete, setBudgetLimitToDelete] =
    useState<BudgetLimit | null>(null);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudgetLimit, setSelectedBudgetLimit] =
    useState<BudgetLimit | null>(null);

  const modalTitle = selectedBudgetLimit
    ? "Bütçe Limitini Düzenle"
    : "Yeni Bütçe Limiti";

  const hasBudgetLimits = budgetLimits.length > 0;

  const sortedBudgetLimits = useMemo(() => {
    return [...budgetLimits].sort((a, b) =>
      a.category.localeCompare(b.category),
    );
  }, [budgetLimits]);

  const handleOpenCreateModal = () => {
    setSelectedBudgetLimit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (budgetLimit: BudgetLimit) => {
    setSelectedBudgetLimit(budgetLimit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isActionLoading) return;

    setIsModalOpen(false);
    setSelectedBudgetLimit(null);
  };

  const handleSubmit = async (
    data: CreateBudgetLimitPayload | UpdateBudgetLimitPayload,
  ) => {
    if (selectedBudgetLimit) {
      await updateBudgetLimit(selectedBudgetLimit._id, data);
    } else {
      await createBudgetLimit(data as CreateBudgetLimitPayload);
    }

    handleCloseModal();
  };
  const handleOpenDeleteModal = (budgetLimit: BudgetLimit) => {
    setBudgetLimitToDelete(budgetLimit);
  };
  const handleConfirmDelete = async () => {
    if (!budgetLimitToDelete) return;

    await deleteBudgetLimit(budgetLimitToDelete._id);
    setBudgetLimitToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    if (isActionLoading) return;

    setBudgetLimitToDelete(null);
  };

  if (!canViewBudgets) {
    return (
      <main className="budget-page">
        <section className="budget-page__empty">
          <h1>{t("budget.you_dont_have_permission_to_view_this_area")}</h1>
          <p>
            {t("budget.you_dont_have_permission_to_view_this_area_description")}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="budget-page">
      <section className="budget-page__header">
        <div>
          <p className="budget-page__eyebrow">{t("budget.budget_control")}</p>
          <h1 className="budget-page__title">{t("budget.budget_limits")}</h1>
          <p className="budget-page__description">
            {t("budget.budget_limits_description")}
          </p>
        </div>

        {canManageBudgets && (
          <Button
            type="button"
            variant="primary"
            onClick={handleOpenCreateModal}
          >
            + {t("budget.new_budget_limit")}
          </Button>
        )}
      </section>

      <section className="budget-page__toolbar">
        <div className="budget-page__toolbar-info">
          <span className="budget-page__toolbar-eyebrow">
            {t("budget.filters")}
          </span>
          <h3 className="budget-page__toolbar-title">
            {t("budget.budget_view")}
          </h3>
          <p className="budget-page__toolbar-description">
            {t("budget.budget_view_description")}
          </p>
        </div>

        <div className="budget-page__toolbar-actions">
          <div className="budget-page__filter">
            <label className="budget-page__filter-label">
              {t("budget.month")}
            </label>
            <input
              className="budget-page__month-input"
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
            />
          </div>

          <Select
            label={t("currency_label")}
            value={currency}
            options={currencyOptions}
            onChange={(value) => setCurrency(value as CurrencyCode)}
          />
        </div>
      </section>

      <BudgetSummaryCards summary={budgetSummary} isLoading={isLoading} />

      <section className="budget-page__content">
        <div className="budget-page__section-header">
          <div>
            <h2 className="budget-page__section-title">
              {t("budget.category_limits")}
            </h2>
            <p className="budget-page__section-description">
              {t("budget.category_limits_description")}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="budget-page__grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="budget-page__card-skeleton" />
            ))}
          </div>
        )}

        {!isLoading && !hasBudgetLimits && (
          <div className="budget-page__empty">
            <h3>{t("budget.no_budget_limits")}</h3>
            <p>{t("budget.no_budget_limits_description")}</p>

            {canManageBudgets && (
              <Button
                type="button"
                variant="primary"
                onClick={handleOpenCreateModal}
              >
                {t("budget.create_first_budget_limit")}
              </Button>
            )}
          </div>
        )}

        {!isLoading && hasBudgetLimits && (
          <div className="budget-page__grid">
            {sortedBudgetLimits.map((budgetLimit) => (
              <BudgetLimitCard
                key={budgetLimit._id}
                budgetLimit={budgetLimit}
                usage={usageByLimitId[budgetLimit._id]}
                canManageBudgets={canManageBudgets}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        width="560px"
      >
        <BudgetLimitForm
          initialData={selectedBudgetLimit}
          isSubmitting={isActionLoading}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
      <Modal
        isOpen={Boolean(budgetLimitToDelete)}
        onClose={handleCloseDeleteModal}
        title="Bütçe Limitini Sil"
        width="460px"
      >
        <div className="budget-page__delete-modal">
          <p>
            <strong>{budgetLimitToDelete?.category}</strong>{" "}
            {t("budget.delete_budget_limit_confirm")}
          </p>

          <span>{t("budget.delete_budget_limit_description")}</span>

          <div className="budget-page__delete-actions">
            <Button
              type="button"
              variant="link"
              onClick={handleCloseDeleteModal}
              disabled={isActionLoading}
            >
              {t("cancel")}
            </Button>

            <Button
              type="button"
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={isActionLoading}
            >
              {t("budget.delete_budget_limit_button")}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default BudgetPage;
