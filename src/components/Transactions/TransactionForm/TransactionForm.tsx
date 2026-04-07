import React, { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { transactionService } from "../../../services/transaction.service";
import type { Transaction } from "../../../types/transaction";
import Select from "../../ui/Select/Select";
interface TransactionFormProps {
  onSuccess?: () => void;
  initialData?: Transaction | null;
}
function TransactionForm({ onSuccess, initialData }: TransactionFormProps) {
  const typeOptions = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
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
      } else {
        await transactionService.create(payload);
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
    <div>
      <div>
        <Input
          label="Title"
          placeholder="Grocery shopping"
          value={formData.title}
          onChange={(val) => handleChange("title", val)}
          error={errors.title}
        />
        <Input
          label="Amount"
          placeholder="100"
          value={formData.amount}
          onChange={(val) => handleChange("amount", val)}
          error={errors.amount}
        />
        <Input
          label="Category"
          placeholder="Groceries"
          value={formData.category}
          onChange={(val) => handleChange("category", val)}
          error={errors.category}
        />
        <Input
          label="Date"
          placeholder="2022-01-01"
          value={formData.date}
          onChange={(val) => handleChange("date", val)}
          error={errors.date}
        />
        <Select
          label="Transaction Type"
          options={typeOptions}
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
          error={errors.type}
        />
      </div>
      <div>
        {initialData ? (
          <Button variant="primary" onClick={() => handleSubmit()}>
            Update Transaction
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleSubmit()}>
            Add Transaction
          </Button>
        )}
      </div>
    </div>
  );
}

export default TransactionForm;
