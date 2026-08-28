import { createContext } from "react";
import type { TransactionTypes } from "../interfaces/transactions";

export interface ReceiptFileRecord {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  url: string;
  transactionId: string | null;
}

export interface ExportFileRecord {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  referenceDate: string | null;
  transactionCount: number;
  blob: Blob;
}

interface ArchiveContextData {
  receipts: ReceiptFileRecord[];
  exports: ExportFileRecord[];
  addReceiptFiles: (files: File[]) => ReceiptFileRecord[];
  removeReceipt: (receiptId: string) => void;
  linkReceiptToTransaction: (
    receiptId: string,
    transactionId: string | null,
  ) => void;
  createTransactionExport: (
    transactions: TransactionTypes[],
    referenceDate?: string,
  ) => ExportFileRecord;
  removeExport: (exportId: string) => void;
}

export const ArchiveContext = createContext<ArchiveContextData>(
  {} as ArchiveContextData,
);
