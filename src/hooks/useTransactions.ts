import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../services/transaction.service";
import { useLoading } from "./useLoading";
import type { Transaction, TransactionFilters } from "../types/transaction";
import { useWorkspace } from "./useWorkspace";

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
    async (page: number, currentFilters: TransactionFilters) => {
      if (!activeWorkspaceId || isWorkspaceLoading) {
        setTransactions([]);
        return;
      }
      try {
        showLoading("Loading...");

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
        hideLoading();
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
