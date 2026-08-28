import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  Link2,
  Pencil,
} from "lucide-react";
import formatCurrency from "../../../utils/format-currency";
import {
  formatTransactionDate,
  paymentMethodLabels,
} from "../files-page-utils";
import type { TransactionDetailsProps } from "../types";

export const TransactionDetails = ({
  transaction,
  receipts,
  onOpenReceipt,
  onEdit,
}: TransactionDetailsProps) => {
  if (!transaction) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <FileText size={40} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Detalhes da transação</p>
        <p className="mt-1 text-sm text-text-secondary">
          Selecione uma transação para consultar seus dados.
        </p>
      </div>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-income">
        Detalhes
      </p>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="wrap-break-word text-xl font-semibold text-white">
            {transaction.description}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {isIncome ? "Entrada" : "Saída"}
          </p>
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
        {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
      </p>
      <dl className="mt-6 space-y-3 rounded-xl border border-border-glass/60 bg-bg-sidebar/35 p-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Data</dt>
          <dd className="font-medium text-white">
            {formatTransactionDate(transaction.date)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Pagamento</dt>
          <dd className="font-medium text-white">
            {paymentMethodLabels[transaction.paymentMethod]}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Comprovantes</dt>
          <dd className="font-medium text-white">{receipts.length}</dd>
        </div>
      </dl>
      {receipts.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-text-secondary">
            Arquivos vinculados
          </h3>
          <ul className="mt-2 space-y-2">
            {receipts.map((receipt) => (
              <li key={receipt.id}>
                <button
                  type="button"
                  onClick={() => onOpenReceipt(receipt.id)}
                  className="flex w-full items-center gap-2 rounded-xl border border-border-glass/60 bg-bg-sidebar/35 px-3 py-2 text-left text-sm text-white transition-colors hover:border-income/40 cursor-pointer"
                >
                  <Link2 size={16} className="shrink-0 text-income" />
                  <span className="truncate">{receipt.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => onEdit(transaction)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border-glass px-4 py-2.5 font-medium text-white transition-colors hover:bg-white/5 cursor-pointer"
      >
        <Pencil size={17} />
        Editar transação
      </button>
    </div>
  );
};
