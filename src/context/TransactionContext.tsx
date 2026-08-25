import { createContext, useState } from "react";
import type {
  TransactionTypes,
  TransactionFilters,
} from "../interfaces/transactions";

interface TransactionContextData {
  transactions: TransactionTypes[];
  filters: TransactionFilters;
  incomeTotal: number;
  expenseTotal: number;
  balanceTotal: number;
  handleAddTransaction: (data: Omit<TransactionTypes, "id">) => void;
  handleDeleteTransactions: (transactionIds: string[]) => void;
  filteredTransactions: TransactionTypes[];
  setTransactionType: (type: TransactionFilters["type"]) => void;
  setTransactionPaymentMethod: (
    paymentMethod: TransactionFilters["paymentMethod"],
  ) => void;
  setTransactionPeriod: (period: TransactionFilters["period"]) => void;
  setTransactionSort: (sort: TransactionFilters["sort"]) => void;
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
    paymentMethod: "all",
    sort: null,
  });

  const setTransactionType = (type: TransactionFilters["type"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      type,
    }));
  };

  const setTransactionPeriod = (period: TransactionFilters["period"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      period,
    }));
  };

  const setTransactionPaymentMethod = (
    paymentMethod: TransactionFilters["paymentMethod"],
  ) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      paymentMethod,
    }));
  };

  const setTransactionSort = (sort: TransactionFilters["sort"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      sort,
    }));
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filters.type === "all") {
        return true;
      }

      return transaction.type === filters.type;
    })
    .filter((transaction) => {
      if (filters.paymentMethod === "all") {
        return true;
      }

      return transaction.paymentMethod === filters.paymentMethod;
    })
    .filter((transaction) => {
      if (filters.period === null) {
        return true;
      }

      const transactionDate = new Date(`${transaction.date}T00:00:00`);
      if (Number.isNaN(transactionDate.getTime())) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filters.period === "today") {
        return transactionDate.getTime() === today.getTime();
      }

      const startDate = new Date(today);
      if (filters.period === "last-year") {
        startDate.setFullYear(startDate.getFullYear() - 1);
      } else if (filters.period === "6m") {
        startDate.setMonth(startDate.getMonth() - 6);
      } else {
        const days = Number.parseInt(filters.period, 10);
        startDate.setDate(startDate.getDate() - (days - 1));
      }

      return transactionDate >= startDate && transactionDate <= today;
    })
    .sort((firstTransaction, secondTransaction) => {
      if (filters.sort === null) {
        return 0;
      }

      const comparison = firstTransaction.description.localeCompare(
        secondTransaction.description,
        "pt-BR",
        { sensitivity: "base" },
      );

      return filters.sort === "az" ? comparison : -comparison;
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

  const handleDeleteTransactions = (transactionIds: string[]) => {
    const idsToDelete = new Set(transactionIds);
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => !idsToDelete.has(transaction.id),
      ),
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filters,
        incomeTotal,
        expenseTotal,
        balanceTotal,
        handleAddTransaction,
        handleDeleteTransactions,
        filteredTransactions,
        setTransactionType,
        setTransactionPaymentMethod,
        setTransactionPeriod,
        setTransactionSort,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
