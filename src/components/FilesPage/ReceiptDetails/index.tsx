import { Download, FileImage, Trash2 } from "lucide-react";
import {
  formatDate,
  formatFileSize,
  formatTransactionDate,
  isPdfReceipt,
} from "../files-page-utils";
import type { ReceiptDetailsProps } from "../types";

export const ReceiptDetails = ({
  receipt,
  transactions,
  linkedTransaction,
  onLinkTransaction,
  onRemove,
}: ReceiptDetailsProps) => {
  if (!receipt) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <FileImage size={40} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Preview do comprovante</p>
        <p className="mt-1 text-sm text-text-secondary">
          Selecione ou envie um arquivo para visualizá-lo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-income">
          Preview
        </p>
        <h2 className="mt-1 truncate text-lg font-semibold text-white">
          {receipt.name}
        </h2>
      </div>
      <div className="flex min-h-72 flex-1 items-center justify-center overflow-hidden rounded-xl border border-border-glass bg-white/95 p-2">
        {isPdfReceipt(receipt.mimeType, receipt.name) ? (
          <object
            data={receipt.url}
            type="application/pdf"
            className="h-112 w-full rounded-lg"
          >
            <a
              href={receipt.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-balance underline"
            >
              Abrir PDF
            </a>
          </object>
        ) : (
          <img
            src={receipt.url}
            alt={`Comprovante ${receipt.name}`}
            className="max-h-112 w-full object-contain"
          />
        )}
      </div>
      <div className="mt-4 space-y-3">
        <label className="block text-sm text-text-secondary">
          Vincular à transação
          <select
            value={receipt.transactionId ?? ""}
            onChange={(event) =>
              onLinkTransaction(receipt.id, event.target.value || null)
            }
            className="mt-1.5 w-full rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none focus:border-income"
          >
            <option value="">Sem vínculo</option>
            {receipt.transactionId && !linkedTransaction && (
              <option value={receipt.transactionId}>Transação removida</option>
            )}
            {transactions.map((transaction) => (
              <option key={transaction.id} value={transaction.id}>
                {transaction.description} ·{" "}
                {formatTransactionDate(transaction.date)}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>{formatFileSize(receipt.size)}</span>
          <span>{formatDate(receipt.uploadedAt)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={receipt.url}
            download={receipt.name}
            className="flex items-center justify-center gap-2 rounded-xl border border-border-glass px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            <Download size={17} />
            Baixar
          </a>
          <button
            type="button"
            onClick={() => onRemove(receipt.id)}
            className="flex items-center justify-center gap-2 rounded-xl border border-expense/30 px-3 py-2 text-sm font-medium text-expense transition-colors hover:bg-expense/10 cursor-pointer"
          >
            <Trash2 size={17} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
