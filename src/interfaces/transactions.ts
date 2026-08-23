export interface TransactionTypes {
  id: string;
  description: string;
  amount: string;
  type: "income" | "expense";
  date: string;
}

export interface TransactionFilters {
  period: string | null;
  type: "all" | "income" | "expense";
  sort: "az" | "za" | null;
}