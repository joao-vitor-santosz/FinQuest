import { useState } from "react";
import type { ReactNode } from "react";
import type { Bill } from "../interfaces/bills";
import { BillsContext } from "./bills-context";

export const BillsProvider = ({ children }: { children: ReactNode }) => {
  const [bills] = useState<Bill[]>([]);

  return (
    <BillsContext.Provider value={{ bills }}>{children}</BillsContext.Provider>
  );
};
