import { createContext } from "react";
import type { Bill, BillInput } from "../interfaces/bills";

interface BillsContextData {
  bills: Bill[];
  addBill: (data: BillInput) => void;
  updateBill: (billId: string, data: BillInput) => void;
  removeBill: (billId: string) => void;
}

export const BillsContext = createContext<BillsContextData>(
  {} as BillsContextData,
);
