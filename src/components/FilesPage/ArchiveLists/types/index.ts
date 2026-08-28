import type { ExportFileRecord, ReceiptFileRecord } from "../../../../context/archive-context";
import type { TransactionTypes } from "../../../../interfaces/transactions";
import type { UploadFeedback } from "../../types";

export interface ReceiptArchiveListProps {
  receipts: ReceiptFileRecord[];
  transactions: TransactionTypes[];
  selectedReceiptId: string | null;
  isDraggingFile: boolean;
  uploadFeedback: UploadFeedback | null;
  onSelectFiles: () => void;
  onDraggingChange: (isDragging: boolean) => void;
  onFilesDropped: (files: File[]) => void;
  onSelectReceipt: (receiptId: string) => void;
}

export interface TransactionArchiveListProps {
  transactions: TransactionTypes[];
  receipts: ReceiptFileRecord[];
  selectedTransactionId: string | null;
  onSelectTransaction: (transactionId: string) => void;
}

export interface ExportArchiveListProps {
  exports: ExportFileRecord[];
  selectedExportId: string | null;
  onSelectExport: (exportId: string) => void;
}