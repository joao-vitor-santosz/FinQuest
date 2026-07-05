import { createContext, useState } from "react";
import type { TransactionTypes } from "../interfaces/transactions";

interface TransactionContextData {
  transactions: TransactionTypes[];
  handleAddTransiction: (data: Omit<TransactionTypes, "id">) => void;
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

  const handleAddTransiction = (data: Omit<TransactionTypes, "id">) => {
    const newTransaction: TransactionTypes = {
      ...data,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, handleAddTransiction }}>
      {children}
    </TransactionContext.Provider>
  );
};
