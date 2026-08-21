import { createContext, useState } from "react";
import type { TransactionTypes } from "../interfaces/transactions";
import { sortItems, periodOptions, transactionOptions } from "../components/Filters/filtersCategories";

interface TransactionContextData {
  transactions: TransactionTypes[];
  incomeTotal: number;
  expenseTotal: number;
  balanceTotal: number;
  handleAddTransiction: (data: Omit<TransactionTypes, "id">) => void;
  filteredTransactions: () => void;
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

  const [ filters, setFilters ] = useState()

  const filteredTransactions = () => {
    
  }

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

  const handleAddTransiction = (data: Omit<TransactionTypes, "id">) => {
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
        handleAddTransiction,
        filteredTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
