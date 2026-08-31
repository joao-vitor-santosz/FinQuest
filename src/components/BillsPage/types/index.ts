import { BellRing, CalendarClock, CircleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const summaryCards: Array<{
  label: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
}> = [
  {
    label: "Vencem hoje",
    description: "Nenhuma conta para hoje",
    icon: CalendarClock,
    accentClassName: "bg-balance/10 text-balance",
  },
  {
    label: "Próximos 7 dias",
    description: "Acompanhe os próximos vencimentos",
    icon: BellRing,
    accentClassName: "bg-income/10 text-income",
  },
  {
    label: "Atrasadas",
    description: "Nenhuma pendência identificada",
    icon: CircleAlert,
    accentClassName: "bg-expense/10 text-expense",
  },
];
