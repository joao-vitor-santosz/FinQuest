export interface TransactionTypes {
  id: string;
  description: string;
  amount: string;
  type: "income" | "expense";
  date: string;
  paymentMethod: "pix" | "dinheiro" | "debito" | "credito";
}

export interface TransactionFilters {
  period: "last-year" | "today" | "7d" | "15d" | "30d" | "6m" | null;
  type: "all" | "income" | "expense";
  sort: "az" | "za" | null;
}
