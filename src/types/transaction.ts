export type CurrencyCode = "TRY" | "USD" | "EUR";

export type TransactionType = "income" | "expense";

export interface TransactionCreatedBy {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface Transaction {
  _id?: string;
  workspaceId: string;

  createdBy: string | TransactionCreatedBy;

  title: string;

  input_details: {
    amount: number;
    currency: CurrencyCode;
  };

  conversions?: {
    TRY: number;
    USD: number;
    EUR: number;
  };

  type: TransactionType;
  category: string;
  date: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  search?: string;
  filter?: "" | "newest" | "oldest" | "7days" | "30days";
}

export type TransactionPayload = {
  title: string;
  input_details: {
    amount: number;
    currency: CurrencyCode;
  };
  type: TransactionType;
  category: string;
  date: string;
  description?: string;
};
