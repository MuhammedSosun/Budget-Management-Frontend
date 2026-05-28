export type CurrencyCode = "TRY" | "USD" | "EUR";

export type BudgetPeriod = "monthly";

export type BudgetUsageStatus = "SAFE" | "WARNING" | "EXCEEDED";

export interface MoneyValue {
  amount: number;
  currency: CurrencyCode;
}

export interface BudgetLimit {
  _id: string;
  workspaceId: string;
  category: string;
  limit: MoneyValue;
  period: BudgetPeriod;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBudgetLimitPayload {
  category: string;
  limit: {
    amount: number;
    currency: CurrencyCode;
  };
  period?: BudgetPeriod;
}

export interface UpdateBudgetLimitPayload {
  category?: string;
  limit?: {
    amount: number;
    currency: CurrencyCode;
  };
  period?: BudgetPeriod;
}

export interface BudgetUsage {
  budgetLimitId: string;
  category: string;
  limit: MoneyValue;
  spent: MoneyValue;
  remaining: MoneyValue;
  usagePercentage: number;
  status: BudgetUsageStatus;
}

export interface BudgetSummary {
  totalBudgetLimits: number;
  safeCount: number;
  warningCount: number;
  exceededCount: number;
  totalLimit: MoneyValue;
  totalSpent: MoneyValue;
  totalRemaining: MoneyValue;
  overallUsagePercentage: number;
}
