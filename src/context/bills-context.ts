import { createContext } from "react";
import type { Bill, BillInput, BillRecurrenceStatus } from "../interfaces/bills";

interface BillsContextData {
  bills: Bill[];
  addBill: (data: BillInput) => void;
  updateBill: (billId: string, data: BillInput) => void;
  markBillAsPaid: (billId: string, transactionId: string) => void;
  setBillRecurrenceStatus: (
    billId: string,
    status: BillRecurrenceStatus,
  ) => void;
  removeBill: (billId: string) => void;
}

export const BillsContext = createContext<BillsContextData>(
  {} as BillsContextData,
);
