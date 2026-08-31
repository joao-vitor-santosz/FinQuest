import { useState } from "react";
import type { ReactNode } from "react";
import type { Bill, BillInput, BillStatus } from "../interfaces/bills";
import { BillsContext } from "./bills-context";

const getBillStatus = (dueDate: string): BillStatus => {
  const today = new Date();
  const todayAsIsoDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return dueDate < todayAsIsoDate ? "overdue" : "pending";
};

export const BillsProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<Bill[]>([]);

  const addBill = (data: BillInput) => {
    const bill: Bill = {
      ...data,
      id: crypto.randomUUID(),
      status: getBillStatus(data.dueDate),
    };

    setBills((currentBills) => [...currentBills, bill]);
  };

  const updateBill = (billId: string, data: BillInput) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === billId
          ? { ...bill, ...data, status: getBillStatus(data.dueDate) }
          : bill,
      ),
    );
  };

  const removeBill = (billId: string) => {
    setBills((currentBills) =>
      currentBills.filter((bill) => bill.id !== billId),
    );
  };

  return (
    <BillsContext.Provider value={{ bills, addBill, updateBill, removeBill }}>
      {children}
    </BillsContext.Provider>
  );
};
