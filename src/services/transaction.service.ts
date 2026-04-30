import api from "../api";
import {
  type Transaction,
  type TransactionFilters,
} from "../types/transaction";
import { v4 as uuidv4 } from "uuid";

export const transactionService = {
  create: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data, {
      headers: { "x-idempotency-key": uuidv4() },
    });
    return response.data;
  },

  getAll: async (
    page: number,
    pageSize: number,
    filters: TransactionFilters,
  ) => {
    const response = await api.get("/transactions/get-all", {
      params: {
        page,
        pageSize,
        ...filters,
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/transactions/delete/${id}`);
    return response.data;
  },
  update: async (id: string, data: Transaction) => {
    const response = await api.put(`/transactions/update/${id}`, data, {
      headers: { "x-idempotency-key": uuidv4() },
    });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/transactions/get/${id}`);
    return response.data;
  },
  totalIncome: async (currency: string) => {
    const response = await api.get("/transactions/total-income", {
      params: { currency },
    });
    return response.data;
  },
  totalExpense: async (currency: string) => {
    const response = await api.get("/transactions/total-expense", {
      params: { currency },
    });
    return response.data;
  },
  getCategoryStats: async (currency: string = "TRY") => {
    const response = await api.get("/transactions/category-stats", {
      params: { currency },
    });
    return response.data;
  },

  getTrendStats: async (
    period: string = "weekly",
    currency: string = "TRY",
  ) => {
    const response = await api.get("/transactions/trend-stats", {
      params: {
        period,
        currency,
      },
    });
    return response.data;
  },
};
