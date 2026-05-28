import { useEffect, useState, type FormEvent } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import type {
  BudgetLimit,
  CreateBudgetLimitPayload,
  UpdateBudgetLimitPayload,
} from "../../../types/budget-limit";
import "./BudgetLimitForm.scss";
import { getExpenseCategorySelectOptions } from "../../../constants/categories";
import { useTranslation } from "react-i18next";

interface BudgetLimitFormProps {
  initialData?: BudgetLimit | null;
  isSubmitting?: boolean;
  onSubmit: (
    data: CreateBudgetLimitPayload | UpdateBudgetLimitPayload,
  ) => Promise<void> | void;
  onCancel: () => void;
}

interface BudgetLimitFormState {
  category: string;
  amount: string;
  currency: "TRY" | "USD" | "EUR";
}

interface BudgetLimitFormErrors {
  category?: string;
  amount?: string;
  currency?: string;
}

const currencyOptions = [
  {
    label: "TRY",
    value: "TRY",
  },
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "EUR",
    value: "EUR",
  },
];

const initialFormState: BudgetLimitFormState = {
  category: "",
  amount: "",
  currency: "TRY",
};

const hasMoreThanTwoDecimals = (value: string) => {
  const decimalPart = value.split(".")[1];

  return Boolean(decimalPart && decimalPart.length > 2);
};

export const BudgetLimitForm = ({
  initialData,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: BudgetLimitFormProps) => {
  const { t } = useTranslation();
  const categoryOptions = getExpenseCategorySelectOptions(t);

  const [form, setForm] = useState<BudgetLimitFormState>(initialFormState);
  const [errors, setErrors] = useState<BudgetLimitFormErrors>({});

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (!initialData) {
      setForm(initialFormState);
      setErrors({});
      return;
    }

    setForm({
      category: initialData.category,
      amount: String(initialData.limit.amount),
      currency: initialData.limit.currency,
    });

    setErrors({});
  }, [initialData]);

  const updateField = <K extends keyof BudgetLimitFormState>(
    key: K,
    value: BudgetLimitFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors: BudgetLimitFormErrors = {};

    const trimmedCategory = form.category.trim();
    const amountAsNumber = Number(form.amount);

    if (!trimmedCategory) {
      nextErrors.category = t("budget.category_required");
    } else if (trimmedCategory.length < 2) {
      nextErrors.category = t("budget.category_min_length");
    } else if (trimmedCategory.length > 50) {
      nextErrors.category = t("budget.category_max_length");
    }

    if (!form.amount) {
      nextErrors.amount = t("budget.amount_required");
    } else if (Number.isNaN(amountAsNumber)) {
      nextErrors.amount = t("budget.amount_invalid");
    } else if (amountAsNumber <= 0) {
      nextErrors.amount = t("budget.amount_min");
    } else if (amountAsNumber > 10000000) {
      nextErrors.amount = t("budget.amount_max");
    } else if (hasMoreThanTwoDecimals(form.amount)) {
      nextErrors.amount = t("budget.amount_decimals");
    }

    if (!form.currency) {
      nextErrors.currency = t("budget.currency_required");
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const payload: CreateBudgetLimitPayload | UpdateBudgetLimitPayload = {
      category: form.category.trim(),
      limit: {
        amount: Number(form.amount),
        currency: form.currency,
      },
      period: "monthly",
    };

    await onSubmit(payload);
  };

  return (
    <form className="budget-limit-form" onSubmit={handleSubmit}>
      <div className="budget-limit-form__grid">
        <Select
          label={t("category")}
          options={categoryOptions}
          value={form.category}
          onChange={(value) => updateField("category", value)}
          error={errors.category}
        />

        <Input
          label={t("budget.monthly_budget")}
          placeholder="Örn: 5000"
          type="number"
          value={form.amount}
          onChange={(value) => updateField("amount", value)}
          error={errors.amount}
        />

        <Select
          label={t("currency_label")}
          value={form.currency}
          options={currencyOptions}
          onChange={(value) =>
            updateField("currency", value as BudgetLimitFormState["currency"])
          }
          error={errors.currency}
        />

        <div className="budget-limit-form__period-box">
          <span className="budget-limit-form__period-label">
            {t("budget.period")}
          </span>
          <strong className="budget-limit-form__period-value">
            {t("budget.monthly")}
          </strong>
          <p className="budget-limit-form__period-helper">
            {t("budget.limit_calculation_monthly_description")}
          </p>
        </div>
      </div>

      <div className="budget-limit-form__actions">
        <Button
          type="button"
          variant="link"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t("cancel")}
        </Button>

        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {isEditMode ? t("budget.update_limit") : t("budget.create_limit")}
        </Button>
      </div>
    </form>
  );
};
