import {
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  ReceiptText,
} from "lucide-react";
import formatCurrency from "../../../utils/format-currency";
import { getEffectiveBillStatus } from "../../../utils/bill-status";
import {
  billRecurrenceLabels,
  billStatusLabels,
  formatBillDate,
  groupBillsByDueDate,
} from "../bill-utils";
import type { BillsListProps } from "./types";

const statusClassNames = {
  pending: "bg-balance/10 text-balance",
  paid: "bg-income/10 text-income",
  overdue: "bg-expense/10 text-expense",
} as const;

export const BillsList = ({
  bills,
  selectedBillId,
  hasActiveFilters,
  onSelect,
}: BillsListProps) => {
  if (bills.length === 0) {
    return (
      <section className="animate-page-content-enter flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-glass bg-bg-card/40 px-6 text-center backdrop-blur-md">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-sidebar text-text-muted">
          <Landmark size={28} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-white">
          {hasActiveFilters
            ? "Nenhuma conta encontrada"
            : "Suas contas aparecerão aqui"}
        </h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          {hasActiveFilters
            ? "Ajuste a busca ou os filtros para encontrar outras contas."
            : "Cadastre sua primeira conta para acompanhar vencimentos e parcelamentos em um só lugar."}
        </p>
      </section>
    );
  }

  return (
    <section className="animate-page-content-enter rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Contas cadastradas</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {bills.length === 1 ? "1 conta cadastrada" : `${bills.length} contas cadastradas`}
          </p>
        </div>
        <ReceiptText size={22} className="text-income" />
      </div>

      <div className="space-y-5">
        {groupBillsByDueDate(bills).map((group) => (
          <section key={group.key}>
            <h3 className="mb-2 text-sm font-medium text-text-secondary">
              {group.label}
            </h3>
            <ul className="flex flex-col gap-2">
              {group.bills.map((bill) => {
                const isIncome = bill.type === "income";
                const status = getEffectiveBillStatus(bill);
                const isSelected = bill.id === selectedBillId;

                return (
                  <li key={bill.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(bill.id)}
                      className={`flex w-full flex-col gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer sm:flex-row sm:items-center ${isSelected ? "border-income/40 bg-income/10" : "border-border-glass/60 bg-bg-sidebar/35 hover:border-border-glass"}`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-income/10 text-income" : "bg-expense/10 text-expense"}`}
                      >
                        {isIncome ? (
                          <ArrowUpRight size={20} />
                        ) : (
                          <ArrowDownLeft size={20} />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-white">
                          {bill.description}
                        </span>
                        <span className="mt-0.5 block text-sm text-text-secondary">
                          {bill.category} · Vence em {formatBillDate(bill.dueDate)}{" "}
                          · {billRecurrenceLabels[bill.recurrence]}
                          {bill.installment
                            ? ` · ${bill.installment.current} de ${bill.installment.total}`
                            : ""}
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="text-left sm:text-right">
                          <span
                            className={`block font-semibold ${isIncome ? "text-income" : "text-expense"}`}
                          >
                            {isIncome ? "+" : "-"} {formatCurrency(bill.amount)}
                          </span>
                          <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClassNames[status]}`}
                          >
                            {billStatusLabels[status]}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};
