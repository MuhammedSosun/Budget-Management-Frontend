import api from "../api";
import {
  type CurrencyCode,
  type TransactionFilters,
  type TransactionPayload,
} from "../types/transaction";
import { v4 as uuidv4 } from "uuid";

const getTransactionBaseUrl = (workspaceId: string) =>
  `/workspaces/${workspaceId}/transactions`;

export const transactionService = {
  create: async (workspaceId: string, data: TransactionPayload) => {
    const response = await api.post(getTransactionBaseUrl(workspaceId), data, {
      headers: { "x-idempotency-key": uuidv4() },
    });

    return response.data;
  },

  getAll: async (
    workspaceId: string,
    page: number,
    pageSize: number,
    filters: TransactionFilters,
  ) => {
    const response = await api.get(getTransactionBaseUrl(workspaceId), {
      params: {
        page,
        pageSize,
        ...filters,
      },
    });

    return response.data;
  },

  getById: async (workspaceId: string, id: string) => {
    const response = await api.get(
      `${getTransactionBaseUrl(workspaceId)}/${id}`,
    );

    return response.data;
  },

  update: async (workspaceId: string, id: string, data: TransactionPayload) => {
    const response = await api.put(
      `${getTransactionBaseUrl(workspaceId)}/${id}`,
      data,
      {
        headers: { "x-idempotency-key": uuidv4() },
      },
    );

    return response.data;
  },

  delete: async (workspaceId: string, id: string) => {
    const response = await api.delete(
      `${getTransactionBaseUrl(workspaceId)}/${id}`,
    );

    return response.data;
  },

  totalIncome: async (workspaceId: string, currency: CurrencyCode = "TRY") => {
    const response = await api.get(
      `${getTransactionBaseUrl(workspaceId)}/total-income`,
      {
        params: { currency },
      },
    );

    return response.data;
  },

  totalExpense: async (workspaceId: string, currency: CurrencyCode = "TRY") => {
    const response = await api.get(
      `${getTransactionBaseUrl(workspaceId)}/total-expense`,
      {
        params: { currency },
      },
    );

    return response.data;
  },

  getCategoryStats: async (
    workspaceId: string,
    currency: CurrencyCode = "TRY",
  ) => {
    const response = await api.get(
      `${getTransactionBaseUrl(workspaceId)}/category-stats`,
      {
        params: { currency },
      },
    );

    return response.data;
  },

  getTrendStats: async (
    workspaceId: string,
    period: "weekly" | "monthly" = "weekly",
    currency: CurrencyCode = "TRY",
  ) => {
    const response = await api.get(
      `${getTransactionBaseUrl(workspaceId)}/trend-stats`,
      {
        params: {
          period,
          currency,
        },
      },
    );

    return response.data;
  },
};
