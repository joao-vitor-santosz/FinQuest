import type { Bill } from "../interfaces/bills";
import { getBillStatusForDueDate } from "./bill-status";

const getNextDueDate = (
  dueDate: string,
  recurrence: "monthly" | "annual",
) => {
  const [year, month, day] = dueDate.split("-").map(Number);
  const monthOffset = recurrence === "monthly" ? 1 : 12;
  const targetMonthIndex = month - 1 + monthOffset;
  const targetYear = year + Math.floor(targetMonthIndex / 12);
  const targetMonth = targetMonthIndex % 12;
  const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

  return [
    targetYear,
    String(targetMonth + 1).padStart(2, "0"),
    String(Math.min(day, daysInTargetMonth)).padStart(2, "0"),
  ].join("-");
};

export const hasNextBill = (bill: Bill) =>
  bill.installment
    ? bill.installment.current < bill.installment.total
    : bill.recurrence !== "one-time" && bill.recurrenceStatus === "active";

export const createNextBill = (bill: Bill): Bill | null => {
  if (!hasNextBill(bill)) {
    return null;
  }

  if (bill.installment) {
    const dueDate = getNextDueDate(bill.dueDate, "monthly");

    return {
      ...bill,
      id: crypto.randomUUID(),
      dueDate,
      status: getBillStatusForDueDate(dueDate),
      installment: { ...bill.installment, current: bill.installment.current + 1 },
      transactionId: null,
    };
  }

  if (bill.recurrence === "one-time") {
    return null;
  }

  const dueDate = getNextDueDate(bill.dueDate, bill.recurrence);

  return {
    ...bill,
    id: crypto.randomUUID(),
    dueDate,
    status: getBillStatusForDueDate(dueDate),
    installment: null,
    transactionId: null,
  };
};
