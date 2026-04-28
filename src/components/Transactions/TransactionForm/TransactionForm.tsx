import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { transactionService } from "../../../services/transaction.service";
import type { Transaction } from "../../../types/transaction";
import Select from "../../ui/Select/Select";
import { useTranslation } from "react-i18next";
import { refreshDashboard } from "../../../utils/events";
interface TransactionFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
  initialData?: Transaction | null;
}
function TransactionForm({
  onSuccess,
  onCancel,
  initialData,
}: TransactionFormProps) {
  const { t } = useTranslation();
  const typeOptions = [
    { label: t("income"), value: "income" },
    { label: t("expense"), value: "expense" },
  ];
  const [formData, setFormData] = useState<Transaction>(() => {
    if (initialData) return initialData;
    return {
      title: "",
      amount: 0,
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    } as Transaction;
  });
  const isEditMode = !!initialData?._id;
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    const payload: Transaction = {
      ...formData,
      amount: Number(formData.amount),
      date: formData.date
        ? new Date(formData.date).toISOString()
        : new Date().toISOString(),
    };
    try {
      if (isEditMode && initialData?._id) {
        await transactionService.update(initialData._id, payload);
        refreshDashboard();
      } else {
        await transactionService.create(payload);
        refreshDashboard();
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [errors] = useState<Record<string, string>>({});

  return (
    <div className="transaction-form">
      <div className="transaction-form__inputs">
        <Input
          label={t("title")}
          placeholder={t("title_placeholder")}
          value={formData.title}
          onChange={(val) => handleChange("title", val)}
          error={errors.title}
        />
        <Input
          label={t("amount")}
          placeholder={t("amount_placeholder")}
          value={formData.amount}
          onChange={(val) => handleChange("amount", val)}
          error={errors.amount}
        />
        <Input
          label={t("category")}
          placeholder={t("category_placeholder")}
          value={formData.category}
          onChange={(val) => handleChange("category", val)}
          error={errors.category}
        />
        <Input
          label={t("date")}
          type="date"
          value={formData.date}
          onChange={(val) => handleChange("date", val)}
          error={errors.date}
        />
        <Select
          label={t("transaction_type")}
          options={typeOptions}
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
          error={errors.type}
        />
      </div>

      <div className="transaction-form__actions">
        <Button variant="primary" onClick={() => handleSubmit()}>
          {initialData ? t("edit_transaction_this") : t("add_transaction_this")}
        </Button>

        <Button variant="danger" onClick={onCancel}>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}

export default TransactionForm;
