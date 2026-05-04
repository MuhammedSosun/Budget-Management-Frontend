import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transaction.service";
import { useLoading } from "./useLoading";
import type { Transaction, TransactionFilters } from "../types/transaction";

export const useTransactions = (initialPageSize = 10) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState<TransactionFilters>({
    type: "",
    startDate: "",
    endDate: "",
    category: "",
    search: "",
    filter: "",
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: initialPageSize,
  });

  const { showLoading, hideLoading } = useLoading();

  const fetchTransactions = useCallback(
    async (page: number, currentFilters: TransactionFilters) => {
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
        if (import.meta.env.DEV) {
          console.error(error);
        }
      } finally {
        hideLoading();
      }
    },
    [initialPageSize, showLoading, hideLoading],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => {
        if (prev.search === searchValue) {
          return prev;
        }

        return {
          ...prev,
          search: searchValue,
        };
      });

      setPagination((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    fetchTransactions(pagination.currentPage, filters);
  }, [pagination.currentPage, filters, fetchTransactions]);

  return {
    transactions,
    pagination,
    setPagination,
    filters,
    setFilters,
    searchValue,
    setSearchValue,
    refresh: () => fetchTransactions(pagination.currentPage, filters),
  };
};
