import {
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";
import formatCurrency from "../../../utils/format-currency";
import {
  billRecurrenceLabels,
  billStatusLabels,
  formatBillDate,
} from "../bill-utils";
import type { BillsListProps } from "./types";

const statusClassNames = {
  pending: "bg-balance/10 text-balance",
  paid: "bg-income/10 text-income",
  overdue: "bg-expense/10 text-expense",
} as const;

export const BillsList = ({ bills, onEdit, onDelete }: BillsListProps) => {
  if (bills.length === 0) {
    return (
      <section className="animate-page-content-enter flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-glass bg-bg-card/40 px-6 text-center backdrop-blur-md">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-sidebar text-text-muted">
          <Landmark size={28} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-white">
          Suas contas aparecerão aqui
        </h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          Cadastre sua primeira conta para acompanhar vencimentos e
          parcelamentos em um só lugar.
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

      <ul className="flex flex-col gap-2">
        {bills.map((bill) => {
          const isIncome = bill.type === "income";
          const canEdit = bill.status === "pending";

          return (
            <li
              key={bill.id}
              className="flex flex-col gap-3 rounded-xl border border-border-glass/60 bg-bg-sidebar/35 p-3 sm:flex-row sm:items-center"
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
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{bill.description}</p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {bill.category} · Vence em {formatBillDate(bill.dueDate)} ·{" "}
                  {billRecurrenceLabels[bill.recurrence]}
                  {bill.installment
                    ? ` · ${bill.installment.current} de ${bill.installment.total}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p
                    className={`font-semibold ${isIncome ? "text-income" : "text-expense"}`}
                  >
                    {isIncome ? "+" : "-"} {formatCurrency(bill.amount)}
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClassNames[bill.status]}`}
                  >
                    {billStatusLabels[bill.status]}
                  </span>
                </div>
                <div className="flex gap-1">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(bill)}
                      className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                      aria-label={`Editar ${bill.description}`}
                    >
                      <Pencil size={17} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(bill)}
                    className="rounded-lg p-2 text-expense transition-colors hover:bg-expense/10 cursor-pointer"
                    aria-label={`Excluir ${bill.description}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
