import api from "../api";
import { type Transaction } from "../types/transaction";

export const transactionService = {
  create: async (data: Transaction) => {
    const response = await api.post("/transactions/create", data);
    return response.data;
  },

  getAll: async (page: number, pageSize: number) => {
    const response = await api.get("/transactions/get-all", {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/transactions/delete/${id}`);
    return response.data;
  },
  update: async (id: string, data: Transaction) => {
    const response = await api.put(`/transactions/update/${id}`, data);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/transactions/get/${id}`);
    return response.data;
  },
  totalIncome: async () => {
    const response = await api.get("/transactions/total-income");
    return response.data;
  },
  totalExpense: async () => {
    const response = await api.get("/transactions/total-expense");
    return response.data;
  },
};
