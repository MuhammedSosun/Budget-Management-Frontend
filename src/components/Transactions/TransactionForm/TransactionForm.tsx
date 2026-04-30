import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { transactionService } from "../../../services/transaction.service";
import type { Transaction } from "../../../types/transaction";
import Select from "../../ui/Select/Select";
import { getTransactionSchema } from "../../../schema/TransactionSchema";
import { useTranslation } from "react-i18next";
import { refreshDashboard } from "../../../utils/events";
import { z } from "zod";
import "./TransactionForm.scss";

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

  const CATEGORY_MAP = {
    income: [
      { label: t("categories.salary"), value: "salary" },
      { label: t("categories.dividend"), value: "dividend" },
      { label: t("categories.trade_profit"), value: "trade_profit" },
      { label: t("categories.freelance"), value: "freelance" },
      { label: t("categories.other"), value: "other" },
    ],
    expense: [
      { label: t("categories.rent"), value: "rent" },
      { label: t("categories.market"), value: "market" },
      { label: t("categories.etf_investment"), value: "etf_investment" },
      { label: t("categories.transport"), value: "transport" },
      { label: t("categories.bills"), value: "bills" },
      { label: t("categories.other"), value: "other" },
    ],
  };

  const [customCategories, setCustomCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const [formData, setFormData] = useState<Transaction>(() => {
    if (initialData) return initialData;
    return {
      title: "",
      input_details: { amount: 0, currency: "TRY" },
      type: "expense",
      category: "market",
      date: new Date().toISOString().split("T")[0],
      description: "",
    } as Transaction;
  });

  // 2. Dinamik Seçenekleri Buradan Alıyoruz
  const currentCategoryOptions = [
    ...CATEGORY_MAP[formData.type],
    ...customCategories,
    { label: t("categories.custom"), value: "custom" },
  ];

  const handleChange = (name: string, value: string) => {
    if (name === "amount" || name === "currency") {
      setFormData({
        ...formData,
        input_details: {
          ...formData.input_details,
          [name]: name === "amount" ? Number(value) : value,
        },
      });
    } else if (name === "type") {
      const nextType = value as "income" | "expense";
      setFormData({
        ...formData,
        type: nextType,
        category: CATEGORY_MAP[nextType][0].value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name] || errors[`input_details.${name}`]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      delete newErrors[`input_details.${name}`];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    try {
      const TransactionSchema = getTransactionSchema(t);
      const validatedData = TransactionSchema.parse(formData);
      const payload = {
        ...validatedData,
        date: validatedData.date.toISOString(),
      };

      if (initialData?._id) {
        await transactionService.update(initialData._id, payload as any);
      } else {
        await transactionService.create(payload as any);
      }

      refreshDashboard();
      onSuccess?.();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const fullPath = err.path.join(".");
          formattedErrors[fullPath] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <>
      <div className="transaction-form">
        <div className="transaction-form__inputs">
          {/* İşlem Tipi */}
          <Select
            label={t("transaction_type")}
            options={[
              { label: t("income"), value: "income" },
              { label: t("expense"), value: "expense" },
            ]}
            value={formData.type}
            onChange={(val) => handleChange("type", val)}
            error={errors.type}
          />

          {/* Başlık */}
          <Input
            label={t("title")}
            placeholder={t("title_placeholder")}
            value={formData.title}
            onChange={(val) => handleChange("title", val)}
            error={errors.title}
          />

          {/* Miktar ve Para Birimi Grubu */}
          <div className="transaction-form__amount-group">
            <Input
              label={t("amount")}
              type="number"
              placeholder="0"
              value={formData.input_details.amount}
              onChange={(val) => handleChange("amount", val)}
              error={errors["input_details.amount"]}
            />
            <Select
              label={t("currency")}
              options={[
                { label: "₺ TRY", value: "TRY" },
                { label: "$ USD", value: "USD" },
                { label: "€ EUR", value: "EUR" },
              ]}
              value={formData.input_details.currency}
              onChange={(val) => handleChange("currency", val)}
            />
          </div>

          {/* Kategori - Dinamik */}
          <Select
            label={t("category")}
            options={currentCategoryOptions}
            value={formData.category}
            onChange={(val) => {
              if (val === "custom") {
                setIsCustomModalOpen(true);
                return;
              }
              handleChange("category", val);
            }}
            error={errors.category}
          />

          {/* Tarih */}
          <Input
            label={t("date")}
            type="date"
            value={formData.date}
            onChange={(val) => handleChange("date", val)}
            error={errors.date}
          />
        </div>

        <div className="transaction-form__actions">
          <Button variant="primary" onClick={handleSubmit}>
            {initialData
              ? t("edit_transaction_this")
              : t("add_transaction_this")}
          </Button>
          <Button variant="danger" onClick={onCancel}>
            {t("cancel")}
          </Button>
        </div>
      </div>

      {/* Custom Kategori Modalı */}
      {isCustomModalOpen && (
        <div className="custom-modal">
          <div className="custom-modal__content">
            <h3>{t("categories.add_custom_title")}</h3>
            <Input
              label={t("category")}
              placeholder={t("categories.custom_placeholder")}
              value={customCategory}
              onChange={(val) => setCustomCategory(val)}
            />
            <div className="custom-modal__actions">
              <Button
                variant="primary"
                onClick={() => {
                  const value = customCategory.trim();
                  if (!value) return;
                  setCustomCategories((prev) => [
                    ...prev,
                    { label: value, value },
                  ]);
                  handleChange("category", value);
                  setCustomCategory("");
                  setIsCustomModalOpen(false);
                }}
              >
                {t("save")}
              </Button>
              <Button
                variant="danger"
                onClick={() => setIsCustomModalOpen(false)}
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionForm;
