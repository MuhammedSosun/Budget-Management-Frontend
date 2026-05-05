import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionForm from "./TransactionForm";
import { transactionService } from "../../../services/transaction.service";

vi.mock("../../../services/transaction.service", () => ({
  transactionService: {
    create: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TransactionForm", () => {
  const onCancel = vi.fn();
  const onSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form", () => {
    render(<TransactionForm onCancel={onCancel} />);

    expect(screen.getByText("title"));
    expect(screen.getByText("transaction_type"));
  });

  it("should call onCancel when cancel button clicked", () => {
    render(<TransactionForm onCancel={onCancel} />);

    fireEvent.click(screen.getByText("cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("should call create on valid submit", async () => {
    render(<TransactionForm onCancel={onCancel} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByPlaceholderText("title_placeholder"), {
      target: { value: "Market alışverişi" },
    });

    fireEvent.change(screen.getByPlaceholderText("0"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByText("add_transaction_this"));

    await waitFor(() => {
      expect(transactionService.create).toHaveBeenCalled();
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it("should call update when initialData exists", async () => {
    const initialData = {
      _id: "1",
      title: "Market",
      amount: 100,
      currency: "TRY",
      input_details: {
        amount: 100,
        currency: "TRY",
      },
      type: "expense",
      category: "market",
      date: "2026-05-01",
    };

    render(
      <TransactionForm
        onCancel={onCancel}
        onSuccess={onSuccess}
        initialData={initialData as any}
      />,
    );

    fireEvent.click(screen.getByText("edit_transaction_this"));

    await waitFor(() => {
      expect(transactionService.update).toHaveBeenCalled();
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});
