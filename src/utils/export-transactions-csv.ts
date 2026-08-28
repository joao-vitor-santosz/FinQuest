import type { TransactionTypes } from "../interfaces/transactions";

const paymentMethodLabels: Record<TransactionTypes["paymentMethod"], string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  debito: "Débito",
  credito: "Crédito",
};

const escapeCsvValue = (value: string) => {
  const safeValue = /^[\t\r ]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""')}"`;
};

export const createTransactionsCsvBlob = (
  transactions: TransactionTypes[],
) => {
  const header = ["Descrição", "Tipo", "Valor", "Data", "Método de pagamento"];
  const rows = transactions.map((transaction) => [
    transaction.description,
    transaction.type === "income" ? "Entrada" : "Saída",
    transaction.amount,
    transaction.date,
    paymentMethodLabels[transaction.paymentMethod],
  ]);
  const csvContent = [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(";"))
    .join("\r\n");
  return new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });
};

export const getTransactionsCsvFileName = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `transacoes-${year}-${month}-${day}.csv`;
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
};

export const exportTransactionsToCsv = (
  transactions: TransactionTypes[],
) => {
  downloadBlob(
    createTransactionsCsvBlob(transactions),
    getTransactionsCsvFileName(),
  );
};
