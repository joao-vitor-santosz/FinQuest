import type { TransactionTypes } from "../../interfaces/transactions";

interface TransactionEventListProps {
  transactions: TransactionTypes[];
}

const paymentMethodLabels: Record<TransactionTypes["paymentMethod"], string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  debito: "Débito",
  credito: "Crédito",
};

export const TransactionEventList = ({
  transactions,
}: TransactionEventListProps) => (
  <aside className="flex min-h-48 flex-col rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6">
    <h2 className="text-xl font-semibold text-white">Movimentações</h2>
    {transactions.length === 0 ? (
      <div className="flex flex-1 items-center justify-center py-10 text-center text-sm text-text-secondary">
        Nenhuma movimentação neste mês.
      </div>
    ) : (
      <ul className="mt-4 flex max-h-96 flex-col gap-3 overflow-y-auto pr-1 scrollbar-hide">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex gap-3">
            <span
              className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${transaction.type === "income" ? "bg-income" : "bg-expense"}`}
            />
            <div className="min-w-0">
              <p className="line-clamp-3 font-medium text-white">
                {transaction.description}
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                {transaction.date} - {paymentMethodLabels[transaction.paymentMethod]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </aside>
);
