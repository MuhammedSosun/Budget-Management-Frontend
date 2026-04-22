import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transaction.service";
import { useLoading } from "./useLoading";
import type { Transaction } from "../types/transaction";

export const useTransactions = (initialPageSize = 10) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: initialPageSize,
  });

  const { showLoading, hideLoading } = useLoading();

  const fetchTransactions = useCallback(
    async (page: number, currentFilters = filters) => {
      try {
        showLoading("Loading...");
        const response = await transactionService.getAll(
          page,
          initialPageSize,
          currentFilters,
        );

        setTransactions(response.data.content);

        setPagination((prev) => {
          const nextCurrentPage = response.data.currentPage;
          const nextTotalPages = response.data.totalPages;

          if (
            prev.currentPage === nextCurrentPage &&
            prev.totalPages === nextTotalPages
          ) {
            return prev;
          }

          return {
            ...prev,
            currentPage: nextCurrentPage,
            totalPages: nextTotalPages,
          };
        });
      } catch (error) {
        console.error(error);
      } finally {
        hideLoading();
      }
    },
    [initialPageSize, showLoading, hideLoading],
  );

  useEffect(() => {
    fetchTransactions(pagination.currentPage, filters);
  }, [pagination.currentPage, filters, fetchTransactions]);

  return {
    transactions,
    pagination,
    setPagination,
    filters,
    setFilters,
    refresh: fetchTransactions,
  };
};
