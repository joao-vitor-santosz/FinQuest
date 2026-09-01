import type { Bill } from "../../../interfaces/bills";
import { getEffectiveBillStatus, getLocalIsoDate } from "../../../utils/bill-status";

export const getBillSummaryCounts = (bills: Bill[]) => {
  const today = new Date();
  const todayAsIsoDate = getLocalIsoDate(today);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextWeekAsIsoDate = getLocalIsoDate(nextWeek);

  return {
    dueToday: bills.filter(
      (bill) =>
        getEffectiveBillStatus(bill, today) === "pending" &&
        bill.dueDate === todayAsIsoDate,
    ).length,
    upcoming: bills.filter(
      (bill) =>
        getEffectiveBillStatus(bill, today) === "pending" &&
        bill.dueDate > todayAsIsoDate &&
        bill.dueDate <= nextWeekAsIsoDate,
    ).length,
    overdue: bills.filter(
      (bill) => getEffectiveBillStatus(bill, today) === "overdue",
    ).length,
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

export const billRecurrenceStatusLabels = {
  active: "Ativa",
  paused: "Pausada",
  ended: "Encerrada",
} as const;

type BillDateGroup = "overdue" | "today" | "upcoming" | "future" | "paid";

const billDateGroupLabels: Record<BillDateGroup, string> = {
  overdue: "Atrasadas",
  today: "Vencem hoje",
  upcoming: "Próximas contas",
  future: "Contas futuras",
  paid: "Pagas",
};

const getBillDateGroup = (bill: Bill, today: Date): BillDateGroup => {
  const status = getEffectiveBillStatus(bill, today);

  if (status === "paid") {
    return "paid";
  }

  if (status === "overdue") {
    return "overdue";
  }

  const todayAsIsoDate = getLocalIsoDate(today);
  if (bill.dueDate === todayAsIsoDate) {
    return "today";
  }

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return bill.dueDate <= getLocalIsoDate(nextWeek) ? "upcoming" : "future";
};

export const groupBillsByDueDate = (bills: Bill[]) => {
  const today = new Date();
  const groupedBills: Record<BillDateGroup, Bill[]> = {
    overdue: [],
    today: [],
    upcoming: [],
    future: [],
    paid: [],
  };

  bills.forEach((bill) => {
    groupedBills[getBillDateGroup(bill, today)].push(bill);
  });

  return (Object.keys(groupedBills) as BillDateGroup[])
    .filter((group) => groupedBills[group].length > 0)
    .map((group) => ({
      key: group,
      label: billDateGroupLabels[group],
      bills: groupedBills[group],
    }));
};
