import {
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionBottomSheet } from "../TransactionBottomSheet";
import formatCurrency from "../../utils/format-currency";

export const TransactionList = () => {
  const [ isBottomSheetOpen, setIsBottomSheetOpen ] = useState(false);
  const { transactions } = useContext(TransactionContext);

  return (
    <>
      <div className="flex-1 p-6 max-h-112.5 overflow-hidden rounded-2xl bg-bg-card/40 border border-border-glass backdrop-blur-md flex flex-col justify-between">
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-3xl font-semibold text-white">Transações</h3>
          <button
            className="text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            onClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {transactions.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-text-secondary text-lg font-medium">
            Nenhuma transação encontrada.
          </div>
        )}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide pr-1 scrollbar-thin">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownLeft;
            const iconBg = isIncome
              ? "bg-income/10 text-income"
              : "bg-expense/10 text-expense";
            return (
              <ul
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-sidebar/40 border border-border-glass/30 hover:border-border-glass transition-all shrink-0"
              >
                {/* Lado Esquerdo: Ícone + Título/Data */}
                <li className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-md font-medium text-white">
                      {transaction.description}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {transaction.date}
                    </span>
                  </div>
                </li>

                {/* Lado Direito: Valor */}
                <span
                  className={`text-lg font-semibold ${transaction.type === "income" ? "text-income" : "text-expense"}`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
              </ul>
            );
          })}
        </div>

        {/* Seta para expandir no final (como no mockup) - flex-shrink-0 fixado */}
        {transactions.length >= 5 && (
          <div className="flex justify-center mt-3 shrink-0">
            <button className="text-text-secondary hover:text-text-primary transition-all animate-bounce">
              <ChevronDown size={20} />
            </button>
          </div>
        )}
      </div>
      <TransactionBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
};
