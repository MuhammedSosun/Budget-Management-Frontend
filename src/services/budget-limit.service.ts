import api from "../api";
import type {
  BudgetLimit,
  BudgetSummary,
  BudgetUsage,
  CreateBudgetLimitPayload,
  CurrencyCode,
  UpdateBudgetLimitPayload,
} from "../types/budget-limit";

export const budgetLimitService = {
  getBudgetLimits: async (workspaceId: string): Promise<BudgetLimit[]> => {
    const response = await api.get(`/workspaces/${workspaceId}/budget-limits`);

    return response.data.data;
  },

  getBudgetLimitById: async (
    workspaceId: string,
    budgetLimitId: string,
  ): Promise<BudgetLimit> => {
    const response = await api.get(
      `/workspaces/${workspaceId}/budget-limits/${budgetLimitId}`,
    );

    return response.data.data;
  },

  createBudgetLimit: async (
    workspaceId: string,
    data: CreateBudgetLimitPayload,
  ): Promise<BudgetLimit> => {
    const response = await api.post(
      `/workspaces/${workspaceId}/budget-limits`,
      data,
    );

    return response.data.data;
  },

  updateBudgetLimit: async (
    workspaceId: string,
    budgetLimitId: string,
    data: UpdateBudgetLimitPayload,
  ): Promise<BudgetLimit> => {
    const response = await api.patch(
      `/workspaces/${workspaceId}/budget-limits/${budgetLimitId}`,
      data,
    );

    return response.data.data;
  },

  deleteBudgetLimit: async (
    workspaceId: string,
    budgetLimitId: string,
  ): Promise<BudgetLimit> => {
    const response = await api.delete(
      `/workspaces/${workspaceId}/budget-limits/${budgetLimitId}`,
    );

    return response.data.data;
  },

  getBudgetUsage: async (params: {
    workspaceId: string;
    month?: string;
    currency?: CurrencyCode;
  }): Promise<BudgetUsage[]> => {
    const response = await api.get(
      `/workspaces/${params.workspaceId}/budget-limits/usage`,
      {
        params: {
          month: params.month,
          currency: params.currency,
        },
      },
    );

    return response.data.data;
  },

  getBudgetUsageByCategory: async (params: {
    workspaceId: string;
    category: string;
    month?: string;
    currency?: CurrencyCode;
  }): Promise<BudgetUsage> => {
    const response = await api.get(
      `/workspaces/${params.workspaceId}/budget-limits/usage/${params.category}`,
      {
        params: {
          month: params.month,
          currency: params.currency,
        },
      },
    );

    return response.data.data;
  },

  getBudgetSummary: async (params: {
    workspaceId: string;
    month?: string;
    currency?: CurrencyCode;
  }): Promise<BudgetSummary> => {
    const response = await api.get(
      `/workspaces/${params.workspaceId}/budget-limits/summary`,
      {
        params: {
          month: params.month,
          currency: params.currency,
        },
      },
    );

    return response.data.data;
  },
};
