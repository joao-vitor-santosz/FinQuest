export interface TransactionTypes {
  id: string;
  description: string;
  amount: string;
  type: "income" | "expense";
  date: string;
  paymentMethod: "pix" | "dinheiro" | "debito" | "credito";
}

export interface TransactionFilters {
  period: string | null;
  type: "all" | "income" | "expense";
  sort: "az" | "za" | null;
}