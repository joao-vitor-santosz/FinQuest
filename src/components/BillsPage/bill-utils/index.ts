import type { Bill } from "../../../interfaces/bills";

const getLocalIsoDate = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export const getBillSummaryCounts = (bills: Bill[]) => {
  const today = new Date();
  const todayAsIsoDate = getLocalIsoDate(today);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekAsIsoDate = getLocalIsoDate(nextWeek);

  return {
    dueToday: bills.filter(
      (bill) => bill.status === "pending" && bill.dueDate === todayAsIsoDate,
    ).length,
    upcoming: bills.filter(
      (bill) =>
        bill.status === "pending" &&
        bill.dueDate > todayAsIsoDate &&
        bill.dueDate <= nextWeekAsIsoDate,
    ).length,
    overdue: bills.filter((bill) => bill.status === "overdue").length,
  };
};

export const formatBillDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T00:00:00`));

export const billStatusLabels = {
  pending: "Pendente",
  paid: "Paga",
  overdue: "Atrasada",
} as const;

export const billRecurrenceLabels = {
  "one-time": "Única",
  monthly: "Mensal",
  annual: "Anual",
} as const;
