import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { TransactionTypes } from "../interfaces/transactions";
import {
  createTransactionsCsvBlob,
  getTransactionsCsvFileName,
} from "../utils/export-transactions-csv";
import {
  ArchiveContext,
  type ExportFileRecord,
  type ReceiptFileRecord,
} from "./archive-context";

export const ArchiveProvider = ({ children }: { children: ReactNode }) => {
  const [receipts, setReceipts] = useState<ReceiptFileRecord[]>([]);
  const [exports, setExports] = useState<ExportFileRecord[]>([]);
  const receiptUrls = useRef(new Set<string>());

  useEffect(
    () => () => {
      receiptUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const addReceiptFiles = (files: File[]) => {
    const uploadedAt = new Date().toISOString();
    const newReceipts = files.map((file) => {
      const url = URL.createObjectURL(file);
      receiptUrls.current.add(url);

      return {
        id: crypto.randomUUID(),
        name: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedAt,
        url,
        transactionId: null,
      };
    });

    setReceipts((currentReceipts) => [...newReceipts, ...currentReceipts]);
    return newReceipts;
  };

  const removeReceipt = (receiptId: string) => {
    setReceipts((currentReceipts) => {
      const receipt = currentReceipts.find((item) => item.id === receiptId);

      if (receipt) {
        URL.revokeObjectURL(receipt.url);
        receiptUrls.current.delete(receipt.url);
      }

      return currentReceipts.filter((item) => item.id !== receiptId);
    });
  };

  const linkReceiptToTransaction = (
    receiptId: string,
    transactionId: string | null,
  ) => {
    setReceipts((currentReceipts) =>
      currentReceipts.map((receipt) =>
        receipt.id === receiptId ? { ...receipt, transactionId } : receipt,
      ),
    );
  };

  const createTransactionExport = (
    transactions: TransactionTypes[],
    referenceDate?: string,
  ) => {
    const createdAt = new Date();
    const fileDate = referenceDate
      ? new Date(`${referenceDate}T00:00:00`)
      : createdAt;
    const blob = createTransactionsCsvBlob(transactions);
    const exportRecord: ExportFileRecord = {
      id: crypto.randomUUID(),
      name: getTransactionsCsvFileName(fileDate),
      size: blob.size,
      createdAt: createdAt.toISOString(),
      referenceDate: referenceDate ?? null,
      transactionCount: transactions.length,
      blob,
    };

    setExports((currentExports) => [exportRecord, ...currentExports]);
    return exportRecord;
  };

  const removeExport = (exportId: string) => {
    setExports((currentExports) =>
      currentExports.filter((item) => item.id !== exportId),
    );
  };

  return (
    <ArchiveContext.Provider
      value={{
        receipts,
        exports,
        addReceiptFiles,
        removeReceipt,
        linkReceiptToTransaction,
        createTransactionExport,
        removeExport,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};
