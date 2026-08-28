import type { TransactionTypes } from "../../../interfaces/transactions";
import type { ReactNode, Ref } from "react";
import type {
  ExportFileRecord,
  ReceiptFileRecord,
} from "../../../context/archive-context";

export type FilesTab = "receipts" | "transactions" | "exports";
export type TransactionTypeFilter = "all" | TransactionTypes["type"];

export interface UploadFeedback {
  message: string;
  isError: boolean;
}

export interface ReceiptDetailsProps {
  receipt: ReceiptFileRecord | null;
  transactions: TransactionTypes[];
  linkedTransaction: TransactionTypes | null;
  onLinkTransaction: (receiptId: string, transactionId: string | null) => void;
  onRemove: (receiptId: string) => void;
}

export interface TransactionDetailsProps {
  transaction: TransactionTypes | null;
  receipts: ReceiptFileRecord[];
  onOpenReceipt: (receiptId: string) => void;
  onEdit: (transaction: TransactionTypes) => void;
}

export interface ExportDetailsProps {
  exportRecord: ExportFileRecord | null;
  onRemove: (exportId: string) => void;
}

export interface ArchiveDetailsProps {
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

export interface PendingArchiveDeletion {
  kind: "receipt" | "export";
  id: string;
  name: string;
}

export interface ExportCsvModalProps {
  isOpen: boolean;
  selectedDate: string;
  transactionCount: number;
  onDateChange: (date: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}
