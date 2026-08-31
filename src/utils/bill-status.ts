import type { Bill, BillStatus } from "../interfaces/bills";

export const getLocalIsoDate = (date = new Date()) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export const getBillStatusForDueDate = (
  dueDate: string,
  currentDate = new Date(),
): BillStatus => (dueDate < getLocalIsoDate(currentDate) ? "overdue" : "pending");

export const getEffectiveBillStatus = (
  bill: Bill,
  currentDate = new Date(),
): BillStatus =>
  bill.status === "paid"
    ? "paid"
    : getBillStatusForDueDate(bill.dueDate, currentDate);
