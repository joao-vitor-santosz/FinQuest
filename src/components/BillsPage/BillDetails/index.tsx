import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  CircleCheckBig,
  Landmark,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";
import formatCurrency from "../../../utils/format-currency";
import { getEffectiveBillStatus } from "../../../utils/bill-status";
import {
  billRecurrenceLabels,
  billStatusLabels,
  formatBillDate,
} from "../bill-utils";
import type { BillDetailsProps } from "./types";

const statusClassNames = {
  pending: "bg-balance/10 text-balance",
  paid: "bg-income/10 text-income",
  overdue: "bg-expense/10 text-expense",
} as const;

export const BillDetails = ({ bill, onPay, onEdit, onDelete }: BillDetailsProps) => {
  if (!bill) {
    return (
      <aside className="animate-page-content-enter flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-glass bg-bg-card/40 px-6 text-center backdrop-blur-md">
        <Landmark size={36} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Detalhes da conta</p>
        <p className="mt-1 text-sm text-text-secondary">
          Selecione uma conta para consultar seus dados.
        </p>
      </aside>
    );
  }

  const status = getEffectiveBillStatus(bill);
  const isIncome = bill.type === "income";
  const canEdit = status === "pending";
  const canPay = status !== "paid";

  return (
    <aside className="animate-page-content-enter min-w-0 rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-income">
        Detalhes
      </p>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="wrap-break-word text-xl font-semibold text-white">
            {bill.description}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{bill.category}</p>
        </div>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-income/10 text-income" : "bg-expense/10 text-expense"}`}
        >
          {isIncome ? <ArrowUpRight size={21} /> : <ArrowDownLeft size={21} />}
        </span>
      </div>
      <p
        className={`mt-6 wrap-break-word text-3xl font-bold ${isIncome ? "text-income" : "text-expense"}`}
      >
        {isIncome ? "+" : "-"} {formatCurrency(bill.amount)}
      </p>
      <span
        className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClassNames[status]}`}
      >
        {billStatusLabels[status]}
      </span>

      <dl className="mt-6 space-y-3 rounded-xl border border-border-glass/60 bg-bg-sidebar/35 p-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="flex items-center gap-2 text-text-secondary">
            <CalendarClock size={16} /> Vencimento
          </dt>
          <dd className="font-medium text-white">{formatBillDate(bill.dueDate)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Tipo</dt>
          <dd className="font-medium text-white">
            {isIncome ? "Conta a receber" : "Conta a pagar"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Recorrência</dt>
          <dd className="font-medium text-white">
            {billRecurrenceLabels[bill.recurrence]}
          </dd>
        </div>
        {bill.installment && (
          <>
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-2 text-text-secondary">
                <ReceiptText size={16} /> Parcelamento
              </dt>
              <dd className="font-medium text-white">
                {bill.installment.current} de {bill.installment.total}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-text-secondary">Valor da parcela</dt>
              <dd className="font-medium text-white">
                {formatCurrency(bill.installment.amount)}
              </dd>
            </div>
          </>
        )}
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {canPay && (
          <button
            type="button"
            onClick={() => onPay(bill)}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-income px-3 py-2.5 text-sm font-semibold text-bg-card transition-opacity hover:opacity-90 cursor-pointer"
          >
            <CircleCheckBig size={17} />
            {isIncome ? "Marcar como recebida" : "Marcar como paga"}
          </button>
        )}
        <button
          type="button"
          onClick={() => onEdit(bill)}
          disabled={!canEdit}
          className="flex items-center justify-center gap-2 rounded-xl border border-border-glass px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <Pencil size={17} />
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(bill)}
          className="flex items-center justify-center gap-2 rounded-xl border border-expense/30 px-3 py-2.5 text-sm font-medium text-expense transition-colors hover:bg-expense/10 cursor-pointer"
        >
          <Trash2 size={17} />
          Excluir
        </button>
      </div>
    </aside>
  );
};
