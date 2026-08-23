import { createContext, useState } from "react";
import type {
  TransactionTypes,
  TransactionFilters,
} from "../interfaces/transactions";

interface TransactionContextData {
  transactions: TransactionTypes[];
  incomeTotal: number;
  expenseTotal: number;
  balanceTotal: number;
  handleAddTransaction: (data: Omit<TransactionTypes, "id">) => void;
  filteredTransactions?: TransactionTypes[];
}

export const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<TransactionTypes[]>([]);

  const [filters, setFilters] = useState<TransactionFilters>({
    period: null,
    type: "all",
    sort: null,
  });

  const incomeTotal = transactions.reduce((acumulador, transaction) => {
    const valueAsNumber = Number(transaction.amount.replace(",", "."));

    if (transaction.type === "income") {
      return acumulador + valueAsNumber;
    }

    return acumulador;
  }, 0);

  const expenseTotal = transactions.reduce((acumulador, transaction) => {
    const valueAsNumber = Number(transaction.amount.replace(",", "."));

    if (transaction.type === "expense") {
      return acumulador + valueAsNumber;
    }

    return acumulador;
  }, 0);

  const balanceTotal = incomeTotal - expenseTotal;

  const handleAddTransaction = (data: Omit<TransactionTypes, "id">) => {
    const newTransaction: TransactionTypes = {
      ...data,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        incomeTotal,
        expenseTotal,
        balanceTotal,
        handleAddTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
