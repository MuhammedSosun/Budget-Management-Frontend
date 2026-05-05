import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { transactionService } from "../services/transaction.service";
import { useTransactions } from "./useTransactions";

vi.mock("../services/transaction.service", () => ({
  transactionService: {
    getAll: vi.fn(),
  },
}));

vi.mock("./useLoading", () => ({
  useLoading: () => ({
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
  }),
}));

describe("useTransactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(transactionService.getAll).mockResolvedValue({
      data: {
        content: [
          {
            _id: "1",
            title: "Market",
            amount: 125,
            currency: "TRY",
            input_details: {
              amount: 125,
              currency: "TRY",
            },
            type: "expense",
            category: "market",
            date: "2026-05-01",
            description: "Haftalık alışveriş",
          },
        ],
        currentPage: 1,
        totalPages: 1,
        totalElements: 1,
        size: 1,
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should fetch transactions on initial render", async () => {
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toHaveLength(1);
    });

    expect(transactionService.getAll).toHaveBeenCalledWith(
      1,
      10,
      result.current.filters,
    );

    expect(result.current.transactions[0].title).toBe("Market");
    expect(result.current.pagination.currentPage).toBe(1);
    expect(result.current.pagination.totalPages).toBe(1);
  });

  it("should update searchValue", async () => {
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toHaveLength(1);
    });

    act(() => {
      result.current.setSearchValue("market");
    });

    expect(result.current.searchValue).toBe("market");
  });

  it("should update filters.search after debounce", async () => {
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toHaveLength(1);
    });

    vi.useFakeTimers();

    act(() => {
      result.current.setSearchValue("market");
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.filters.search).toBe("market");
  });
});
