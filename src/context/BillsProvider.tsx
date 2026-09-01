import { useState } from "react";
import type { ReactNode } from "react";
import type { Bill, BillInput, BillRecurrenceStatus } from "../interfaces/bills";
import { createNextBill } from "../utils/bill-schedule";
import { getBillStatusForDueDate } from "../utils/bill-status";
import { BillsContext } from "./bills-context";

export const BillsProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<Bill[]>([]);

  const addBill = (data: BillInput) => {
    const bill: Bill = {
      ...data,
      id: crypto.randomUUID(),
      status: getBillStatusForDueDate(data.dueDate),
      recurrenceStatus: data.recurrence === "one-time" ? "ended" : "active",
      transactionId: null,
    };

    setBills((currentBills) => [...currentBills, bill]);
  };

  const markBillAsPaid = (billId: string, transactionId: string) => {
    setBills((currentBills) =>
      currentBills.flatMap((bill) => {
        if (bill.id !== billId || bill.status === "paid") {
          return bill;
        }

        const paidBill = { ...bill, status: "paid" as const, transactionId };
        const nextBill = createNextBill(paidBill);

        return nextBill ? [paidBill, nextBill] : paidBill;
      }),
    );
  };

  const setBillRecurrenceStatus = (
    billId: string,
    recurrenceStatus: BillRecurrenceStatus,
  ) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === billId && bill.recurrence !== "one-time"
          ? { ...bill, recurrenceStatus }
          : bill,
      ),
    );
  };

  const updateBill = (billId: string, data: BillInput) => {
    setBills((currentBills) =>
      currentBills.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              ...data,
              status: getBillStatusForDueDate(data.dueDate),
              recurrenceStatus:
                data.recurrence === "one-time"
                  ? "ended"
                  : bill.recurrence === data.recurrence
                    ? bill.recurrenceStatus
                    : "active",
            }
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
      value={{
        bills,
        addBill,
        updateBill,
        markBillAsPaid,
        setBillRecurrenceStatus,
        removeBill,
      }}
    >
      {children}
    </BillsContext.Provider>
  );
};
