import { BellRing, CalendarClock, CircleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BillStatus, BillType } from "../../../interfaces/bills";

export type BillSummaryKey = "dueToday" | "upcoming" | "overdue";

export type BillStatusFilter = "all" | BillStatus;
export type BillTypeFilter = "all" | BillType;
export type BillPeriodFilter = "all" | "today" | "7d" | "month";

export interface BillsFilters {
  searchTerm: string;
  status: BillStatusFilter;
  type: BillTypeFilter;
  category: string;
  period: BillPeriodFilter;
}

export const summaryCards: Array<{
  key: BillSummaryKey;
  label: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
}> = [
  {
    key: "dueToday",
    label: "Vencem hoje",
    description: "Contas com vencimento hoje",
    icon: CalendarClock,
    accentClassName: "bg-balance/10 text-balance",
  },
  {
    key: "upcoming",
    label: "Próximos 7 dias",
    description: "Acompanhe os próximos vencimentos",
    icon: BellRing,
    accentClassName: "bg-income/10 text-income",
  },
  {
    key: "overdue",
    label: "Atrasadas",
    description: "Contas com vencimento pendente",
    icon: CircleAlert,
    accentClassName: "bg-expense/10 text-expense",
  },
];
