import { FileSpreadsheet, FileText, ReceiptText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TransactionTypes } from "../../../interfaces/transactions";
import type { FilesTab } from "../types";

export const filesTabs: Array<{
  id: FilesTab;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "receipts", label: "Comprovantes", icon: ReceiptText },
  { id: "transactions", label: "Transações", icon: FileText },
  { id: "exports", label: "Exportações", icon: FileSpreadsheet },
];

export const paymentMethodLabels: Record<
  TransactionTypes["paymentMethod"],
  string
> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  debito: "Débito",
  credito: "Crédito",
};

export const acceptedReceiptTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
export const maximumReceiptSize = 10 * 1024 * 1024;
export const maximumReceiptCount = 30;
export const maximumReceiptStorage = 100 * 1024 * 1024;

export const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export const formatTransactionDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T00:00:00`));

export const isPdfReceipt = (mimeType: string, name: string) =>
  mimeType === "application/pdf" || name.toLowerCase().endsWith(".pdf");
