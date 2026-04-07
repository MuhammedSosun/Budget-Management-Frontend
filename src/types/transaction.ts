export interface Transaction {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  date: string;
  _id?: string;
}
