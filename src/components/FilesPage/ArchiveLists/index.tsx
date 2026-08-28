import {
  ArrowDownLeft,
  ArrowUpRight,
  FileImage,
  FileSpreadsheet,
  FileText,
  Link2,
  ReceiptText,
  Upload,
} from "lucide-react";
import formatCurrency from "../../../utils/format-currency";
import {
  formatDate,
  formatFileSize,
  formatTransactionDate,
  isPdfReceipt,
  paymentMethodLabels,
} from "../files-page-utils";
import type { ReceiptArchiveListProps, TransactionArchiveListProps, ExportArchiveListProps } from "./types";



export const ReceiptArchiveList = ({
  receipts,
  transactions,
  selectedReceiptId,
  isDraggingFile,
  uploadFeedback,
  onSelectFiles,
  onDraggingChange,
  onFilesDropped,
  onSelectReceipt,
}: ReceiptArchiveListProps) => (
  <>
    <button
      type="button"
      onClick={onSelectFiles}
      onDragEnter={(event) => {
        event.preventDefault();
        onDraggingChange(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => onDraggingChange(false)}
      onDrop={(event) => {
        event.preventDefault();
        onDraggingChange(false);
        onFilesDropped(Array.from(event.dataTransfer.files));
      }}
      className={`mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-4 text-left transition-colors cursor-pointer ${isDraggingFile ? "border-income bg-income/10 text-white" : "border-border-glass bg-bg-sidebar/30 text-text-secondary hover:border-income/50 hover:text-white"}`}
    >
      <Upload size={20} className="shrink-0 text-income" />
      <span className="text-sm">
        Arraste arquivos aqui ou <strong>selecione no dispositivo</strong>. Até 10
        MB por arquivo.
      </span>
    </button>
    {uploadFeedback && (
      <p
        className={`mb-4 rounded-xl border px-3 py-2 text-sm ${uploadFeedback.isError ? "border-expense/30 bg-expense/10 text-red-200" : "border-income/30 bg-income/10 text-green-200"}`}
        role="status"
      >
        {uploadFeedback.message}
      </p>
    )}
    {receipts.length === 0 ? (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border-glass/50 bg-bg-sidebar/20 px-6 text-center">
        <ReceiptText size={36} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Nenhum comprovante encontrado</p>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          Envie recibos em PDF ou imagem para visualizá-los e vinculá-los às suas
          transações.
        </p>
      </div>
    ) : (
      <ul className="flex max-h-120 flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide">
        {receipts.map((receipt) => {
          const linkedTransaction = transactions.find(
            (transaction) => transaction.id === receipt.transactionId,
          );
          const ReceiptIcon = isPdfReceipt(receipt.mimeType, receipt.name)
            ? FileText
            : FileImage;

          return (
            <li key={receipt.id}>
              <button
                type="button"
                onClick={() => onSelectReceipt(receipt.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer ${selectedReceiptId === receipt.id ? "border-income/40 bg-income/10" : "border-border-glass/50 bg-bg-sidebar/35 hover:border-border-glass"}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-balance/10 text-blue-300">
                  <ReceiptIcon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-white">
                    {receipt.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-text-secondary">
                    {formatDate(receipt.uploadedAt)} · {formatFileSize(receipt.size)}
                    {linkedTransaction ? ` · ${linkedTransaction.description}` : ""}
                  </span>
                </span>
                {receipt.transactionId && (
                  <Link2 size={16} className="shrink-0 text-income" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    )}
  </>
);



export const TransactionArchiveList = ({
  transactions,
  receipts,
  selectedTransactionId,
  onSelectTransaction,
}: TransactionArchiveListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border-glass/50 bg-bg-sidebar/20 px-6 text-center">
        <FileText size={36} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Nenhuma transação encontrada</p>
        <p className="mt-1 text-sm text-text-secondary">
          Cadastre uma transação ou ajuste sua busca e os filtros.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex max-h-144 flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide">
      {transactions.map((transaction) => {
        const isIncome = transaction.type === "income";
        const linkedReceiptCount = receipts.filter(
          (receipt) => receipt.transactionId === transaction.id,
        ).length;

        return (
          <li key={transaction.id}>
            <button
              type="button"
              onClick={() => onSelectTransaction(transaction.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer ${selectedTransactionId === transaction.id ? "border-income/40 bg-income/10" : "border-border-glass/50 bg-bg-sidebar/35 hover:border-border-glass"}`}
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
                  {transaction.description}
                </span>
                <span className="mt-0.5 block truncate text-xs text-text-secondary">
                  {formatTransactionDate(transaction.date)} ·{" "}
                  {paymentMethodLabels[transaction.paymentMethod]}
                  {linkedReceiptCount > 0
                    ? ` · ${linkedReceiptCount} comprovante(s)`
                    : ""}
                </span>
              </span>
              <span
                className={`shrink-0 text-sm font-semibold sm:text-base ${isIncome ? "text-income" : "text-expense"}`}
              >
                {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};



export const ExportArchiveList = ({
  exports,
  selectedExportId,
  onSelectExport,
}: ExportArchiveListProps) => {
  if (exports.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border-glass/50 bg-bg-sidebar/20 px-6 text-center">
        <FileSpreadsheet size={36} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Nenhuma exportação gerada</p>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          Gere um CSV com todas as transações cadastradas. Os arquivos
          permanecerão disponíveis durante esta sessão.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex max-h-144 flex-col gap-2 overflow-y-auto pr-1 scrollbar-hide">
      {exports.map((exportRecord) => (
        <li key={exportRecord.id}>
          <button
            type="button"
            onClick={() => onSelectExport(exportRecord.id)}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors cursor-pointer ${selectedExportId === exportRecord.id ? "border-income/40 bg-income/10" : "border-border-glass/50 bg-bg-sidebar/35 hover:border-border-glass"}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-income/10 text-income">
              <FileSpreadsheet size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-white">
                {exportRecord.name}
              </span>
              <span className="mt-0.5 block text-xs text-text-secondary">
                {exportRecord.referenceDate
                  ? `Data exportada: ${formatTransactionDate(exportRecord.referenceDate)}`
                  : formatDate(exportRecord.createdAt)}{" "}
                ·{" "}
                {exportRecord.transactionCount} registros ·{" "}
                {formatFileSize(exportRecord.size)}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
