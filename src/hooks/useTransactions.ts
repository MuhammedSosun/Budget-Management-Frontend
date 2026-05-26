import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transaction.service";
import { useLoading } from "./useLoading";
import type { Transaction, TransactionFilters } from "../types/transaction";
import { useWorkspace } from "./useWorkspace";
import {
  TRANSACTION_CHANGED_EVENT,
  TRANSACTION_CHANGED_STORAGE_KEY,
} from "../utils/events";

export const useTransactions = (initialPageSize = 10) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { activeWorkspaceId, isWorkspaceLoading } = useWorkspace();

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
    async (
      page: number,
      currentFilters: TransactionFilters,
      options?: { silent?: boolean },
    ) => {
      if (!activeWorkspaceId || isWorkspaceLoading) {
        setTransactions([]);
        return;
      }

      try {
        if (!options?.silent) {
          showLoading("Loading...");
        }

        const response = await transactionService.getAll(
          activeWorkspaceId,
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
        if (!options?.silent) {
          hideLoading();
        }
      }
    },
    [
      activeWorkspaceId,
      isWorkspaceLoading,
      initialPageSize,
      showLoading,
      hideLoading,
    ],
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
    if (!activeWorkspaceId || isWorkspaceLoading) {
      setTransactions([]);
      return;
    }

    fetchTransactions(pagination.currentPage, filters);
  }, [
    activeWorkspaceId,
    isWorkspaceLoading,
    pagination.currentPage,
    filters,
    fetchTransactions,
  ]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [activeWorkspaceId]);

  useEffect(() => {
    const handleTransactionChanged = () => {
      fetchTransactions(pagination.currentPage, filters, {
        silent: true,
      });
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TRANSACTION_CHANGED_STORAGE_KEY) {
        handleTransactionChanged();
      }
    };

    window.addEventListener(
      TRANSACTION_CHANGED_EVENT,
      handleTransactionChanged,
    );

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        TRANSACTION_CHANGED_EVENT,
        handleTransactionChanged,
      );

      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchTransactions, pagination.currentPage, filters]);

  const refresh = useCallback(() => {
    return fetchTransactions(pagination.currentPage, filters);
  }, [fetchTransactions, pagination.currentPage, filters]);

  return {
    transactions,
    pagination,
    setPagination,
    filters,
    setFilters,
    searchValue,
    setSearchValue,
    refresh,
  };
};
