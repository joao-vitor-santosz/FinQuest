import { createContext } from "react";
import type { Bill } from "../interfaces/bills";

interface BillsContextData {
  bills: Bill[];
}

export const BillsContext = createContext<BillsContextData>(
  {} as BillsContextData,
);
