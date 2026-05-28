import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { transactionService } from "../../../services/transaction.service";
import type {
  Transaction,
  TransactionPayload,
} from "../../../types/transaction";
import Select from "../../ui/Select/Select";
import { getTransactionSchema } from "../../../schema/TransactionSchema";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import "./TransactionForm.scss";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspace } from "../../../hooks/useWorkspace";
import { getTransactionCategorySelectOptions } from "../../../constants/categories";

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
  const { activeWorkspaceId } = useWorkspace();
  const { t } = useTranslation();

  const [customCategories, setCustomCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const TransactionSchema = getTransactionSchema(t);

  type TransactionFormInput = z.input<typeof TransactionSchema>;
  type TransactionFormOutput = z.output<typeof TransactionSchema>;
  const [customCategory, setCustomCategory] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormInput, unknown, TransactionFormOutput>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      input_details: initialData?.input_details ?? {
        amount: 0,
        currency: "TRY",
      },
      type: initialData?.type ?? "expense",
      category: initialData?.category ?? "market",

      date: initialData?.date
        ? initialData.date.split("T")[0]
        : new Date().toISOString().split("T")[0],

      description: initialData?.description ?? "",
    },
  });
  const selectedType =
    useWatch({
      control,
      name: "type",
    }) ?? "expense";

  const currentCategoryOptions = [
    ...getTransactionCategorySelectOptions(selectedType, t),
    ...customCategories,
    { label: t("categories.custom"), value: "custom" },
  ];

  const onSubmit = async (validatedData: TransactionFormOutput) => {
    if (!activeWorkspaceId) {
      toast.error("Aktif workspace bulunamadı", {
        description: "İşlem eklemek için önce bir workspace seçmelisiniz.",
      });
      return;
    }
    try {
      const payload: TransactionPayload = {
        title: validatedData.title,
        input_details: validatedData.input_details,
        type: validatedData.type,
        category: validatedData.category,
        date: validatedData.date.toISOString(),
        description: validatedData.description,
      };

      if (initialData?._id) {
        await transactionService.update(
          activeWorkspaceId,
          initialData._id,
          payload,
        );
        toast.success(t("toast.transaction_updated"), {
          description: t("toast.transaction_updated_desc"),
        });
      } else {
        await transactionService.create(activeWorkspaceId, payload);
        toast.success(t("toast.transaction_created"), {
          description: t("toast.transaction_created_desc"),
        });
      }

      onSuccess?.();
    } catch {
      toast.error(t("toast.transaction_error"), {
        description: t("toast.transaction_error_desc"),
      });
    }
  };

  return (
    <>
      <div className="transaction-form">
        <div className="transaction-form__inputs">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                label={t("transaction_type")}
                options={[
                  { label: t("income"), value: "income" },
                  { label: t("expense"), value: "expense" },
                ]}
                value={field.value}
                onChange={(val) => {
                  const nextType = val as "income" | "expense";
                  field.onChange(nextType);

                  const firstCategory = getTransactionCategorySelectOptions(
                    nextType,
                    t,
                  )[0];
                  setValue("category", firstCategory.value);
                }}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label={t("title")}
                placeholder={t("title_placeholder")}
                value={field.value}
                onChange={(val) => field.onChange(val)}
                error={errors.title?.message}
              />
            )}
          />

          <div className="transaction-form__amount-group">
            <Controller
              name="input_details.amount"
              control={control}
              render={({ field }) => (
                <Input
                  label={t("amount")}
                  type="number"
                  placeholder="0"
                  value={field.value}
                  onChange={(val) => field.onChange(Number(val))}
                  error={errors.input_details?.amount?.message}
                />
              )}
            />
            <Controller
              name="input_details.currency"
              control={control}
              render={({ field }) => (
                <Select
                  label={t("currency")}
                  options={[
                    { label: "₺ TRY", value: "TRY" },
                    { label: "$ USD", value: "USD" },
                    { label: "€ EUR", value: "EUR" },
                  ]}
                  value={field.value}
                  onChange={(val) =>
                    field.onChange(val as "TRY" | "USD" | "EUR")
                  }
                  error={errors.input_details?.currency?.message}
                />
              )}
            />
          </div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                label={t("category")}
                options={currentCategoryOptions}
                value={field.value}
                onChange={(val) => {
                  if (val === "custom") {
                    setIsCustomModalOpen(true);
                    return;
                  }

                  field.onChange(val);
                }}
                error={errors.category?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                label={t("description")}
                placeholder={t("description_placeholder")}
                value={field.value ?? ""}
                onChange={(val) => field.onChange(val as string)}
                error={errors.description?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                label={t("date")}
                type="date"
                value={field.value}
                onChange={field.onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <div className="transaction-form__actions">
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            {initialData
              ? t("edit_transaction_this")
              : t("add_transaction_this")}
          </Button>
          <Button variant="danger" onClick={onCancel}>
            {t("cancel")}
          </Button>
        </div>
      </div>

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

                  setValue("category", value);
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
