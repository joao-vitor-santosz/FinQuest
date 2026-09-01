export type BillType = "expense" | "income";

export type BillStatus = "pending" | "paid" | "overdue";

export type BillRecurrence = "one-time" | "monthly" | "annual";
export type BillRecurrenceStatus = "active" | "paused" | "ended";

export interface BillInstallment {
  current: number;
  total: number;
  amount: string;
}

export interface Bill {
  id: string;
  description: string;
  category: string;
  amount: string;
  type: BillType;
  dueDate: string;
  status: BillStatus;
  recurrence: BillRecurrence;
  recurrenceStatus: BillRecurrenceStatus;
  installment: BillInstallment | null;
  transactionId: string | null;
}

export type BillInput = Omit<
  Bill,
  "id" | "status" | "recurrenceStatus" | "transactionId"
>;
