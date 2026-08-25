import type { TransactionTypes } from "../interfaces/transactions";

const paymentMethodLabels: Record<TransactionTypes["paymentMethod"], string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  debito: "Débito",
  credito: "Crédito",
};

const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

export const exportTransactionsToCsv = (
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
  const blob = new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
};
