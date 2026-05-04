export interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  currency: "TRY" | "USD" | "EUR";
  input_details: {
    amount: number;
    currency: "TRY" | "USD" | "EUR";
  };
  conversions?: {
    TRY: number;
    USD: number;
    EUR: number;
  };
  type: "income" | "expense";
  category: string;
  date: string;
  description?: string;
}
export interface TransactionFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  search?: string;
  filter?: "" | "newest" | "oldest" | "7days" | "30days";
}

export type TransactionPayload = Omit<Transaction, "_id" | "conversions">;
