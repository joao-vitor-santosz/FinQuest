import { useState } from "react";
import type { ReactNode } from "react";
import type { Bill, BillInput } from "../interfaces/bills";
import { getBillStatusForDueDate } from "../utils/bill-status";
import { BillsContext } from "./bills-context";

export const BillsProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<Bill[]>([]);

  const addBill = (data: BillInput) => {
    const bill: Bill = {
      ...data,
      id: crypto.randomUUID(),
      status: getBillStatusForDueDate(data.dueDate),
      transactionId: null,
    };

    setBills((currentBills) => [...currentBills, bill]);
  };

  const markBillAsPaid = (billId: string, transactionId: string) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === billId
          ? { ...bill, status: "paid", transactionId }
          : bill,
      ),
    );
  };

  const updateBill = (billId: string, data: BillInput) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === billId
          ? { ...bill, ...data, status: getBillStatusForDueDate(data.dueDate) }
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
    <BillsContext.Provider
      value={{ bills, addBill, updateBill, markBillAsPaid, removeBill }}
    >
      {children}
    </BillsContext.Provider>
  );
};
