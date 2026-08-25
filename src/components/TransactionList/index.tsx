import {
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionBottomSheet } from "../TransactionBottomSheet";
import formatCurrency from "../../utils/format-currency";

interface SelectionCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const SelectionCheckbox = ({
  checked,
  onChange,
  label,
  className = "",
}: SelectionCheckboxProps) => (
  <label className={`inline-flex h-5 w-5 shrink-0 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
      aria-label={label}
    />
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-text-secondary/70 bg-transparent text-white transition-all duration-200 peer-checked:border-balance peer-checked:bg-balance peer-focus-visible:ring-2 peer-focus-visible:ring-balance/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-card">
      <Check
        size={14}
        strokeWidth={3}
        className={`transition-all duration-200 ${checked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      />
    </span>
  </label>
);

export const TransactionList = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isDeletingAllVisible, setIsDeletingAllVisible] = useState(false);
  const [hasConfirmedDeleteAll, setHasConfirmedDeleteAll] = useState(false);
  const [deleteFeedback, setDeleteFeedback] = useState<string | null>(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<string[]>(
    [],
  );
  const { filteredTransactions, handleDeleteTransactions } =
    useContext(TransactionContext);

  const visibleTransactionIds = filteredTransactions.map(
    (transaction) => transaction.id,
  );
  const areAllVisibleTransactionsSelected =
    visibleTransactionIds.length > 0 &&
    visibleTransactionIds.every((id) => selectedTransactionIds.includes(id));

  const handleCancelDelete = () => {
    setSelectedTransactionIds([]);
    setIsDeleteConfirmationOpen(false);
    setIsDeletingAllVisible(false);
    setHasConfirmedDeleteAll(false);
    setIsDeleteMode(false);
  };

  const handleToggleTransaction = (transactionId: string) => {
    setSelectedTransactionIds((currentIds) =>
      currentIds.includes(transactionId)
        ? currentIds.filter((id) => id !== transactionId)
        : [...currentIds, transactionId],
    );
  };

  const handleToggleAllTransactions = () => {
    setSelectedTransactionIds(
      areAllVisibleTransactionsSelected ? [] : visibleTransactionIds,
    );
  };

  const handleConfirmDelete = () => {
    const deletedCount = selectedTransactionIds.length;
    handleDeleteTransactions(selectedTransactionIds);
    handleCancelDelete();
    setDeleteFeedback(
      deletedCount === 1
        ? "1 transação foi excluída."
        : `${deletedCount} transações foram excluídas.`,
    );
  };

  useEffect(() => {
    if (deleteFeedback === null) {
      return;
    }

    const timeout = window.setTimeout(() => setDeleteFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [deleteFeedback]);

  return (
    <>
      <div className="flex-1 p-6 max-h-112.5 overflow-hidden rounded-2xl bg-bg-card/40 border border-border-glass backdrop-blur-md flex flex-col justify-between">
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-3xl font-semibold text-white">Transações</h3>
          {isDeleteMode ? (
            <div className="animate-delete-selection-enter flex items-center gap-5">
              <button
                className="text-lg font-medium text-text-secondary transition-colors hover:text-white cursor-pointer"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button
                className="text-lg font-semibold text-expense transition-colors hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                onClick={() => {
                  setIsDeletingAllVisible(areAllVisibleTransactionsSelected);
                  setHasConfirmedDeleteAll(false);
                  setIsDeleteConfirmationOpen(true);
                }}
                disabled={selectedTransactionIds.length === 0}
              >
                Excluir
              </button>
            </div>
          ) : (
            <button
              className="text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              onClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
              aria-label="Abrir opções das transações"
            >
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>

        {isDeleteMode && filteredTransactions.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-border-glass/30 bg-bg-sidebar/40 px-3 py-2 text-sm text-white">
            <span className="text-[18px]">Excluir todas</span>
            <SelectionCheckbox
              className="animate-delete-selection-enter"
              checked={areAllVisibleTransactionsSelected}
              onChange={handleToggleAllTransactions}
              label="Selecionar todas as transações exibidas"
            />
          </div>
        )}

        {filteredTransactions.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-text-secondary text-lg font-medium">
            Nenhuma transação encontrada.
          </div>
        )}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide pr-1">
          {filteredTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownLeft;
            const iconBg = isIncome
              ? "bg-income/10 text-income"
              : "bg-expense/10 text-expense";
            const isSelected = selectedTransactionIds.includes(transaction.id);
            return (
              <ul
                key={transaction.id}
                className={`flex items-center justify-between p-3 rounded-xl bg-bg-sidebar/40 border transition-all shrink-0 border-border-glass/30 hover:border-border-glass`}
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
                {isDeleteMode && (
                  <SelectionCheckbox
                    checked={isSelected}
                    onChange={() => handleToggleTransaction(transaction.id)}
                    label={`Selecionar ${transaction.description} para exclusão`}
                    className="animate-delete-selection-enter ml-4"
                  />
                )}
              </ul>
            );
          })}
        </div>

        {/* Seta para expandir no final (como no mockup) - flex-shrink-0 fixado */}
        {filteredTransactions.length >= 5 && (
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
        onStartDelete={() => {
          setIsBottomSheetOpen(false);
          setIsDeleteMode(true);
        }}
      />
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-sm rounded-2xl border border-border-glass bg-bg-card p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirmation-title"
            aria-describedby="delete-confirmation-description"
          >
            <h2
              id="delete-confirmation-title"
              className="text-xl font-semibold text-white"
            >
              Confirmar exclusão
            </h2>
            <p
              id="delete-confirmation-description"
              className="mt-3 text-text-secondary"
            >
              {selectedTransactionIds.length === 1
                ? "Esta transação será excluída permanentemente."
                : `${selectedTransactionIds.length} transações serão excluídas permanentemente.`}
            </p>
            {isDeletingAllVisible && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-expense/30 bg-expense/10 p-3 text-sm text-white">
                <SelectionCheckbox
                  checked={hasConfirmedDeleteAll}
                  onChange={() => setHasConfirmedDeleteAll((current) => !current)}
                  label="Confirmar exclusão de todas as transações exibidas"
                />
                <span>
                  Entendo que todas as transações exibidas serão excluídas e a
                  ação não poderá ser desfeita.
                </span>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-xl px-4 py-2 font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                onClick={() => {
                  setHasConfirmedDeleteAll(false);
                  setIsDeleteConfirmationOpen(false);
                }}
              >
                Voltar
              </button>
              <button
                className="rounded-xl bg-expense px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                onClick={handleConfirmDelete}
                disabled={isDeletingAllVisible && !hasConfirmedDeleteAll}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteFeedback && (
        <div
          className="animate-delete-feedback fixed bottom-6 right-6 z-1001 rounded-xl border border-income/30 bg-bg-card px-4 py-3 text-sm font-medium text-white shadow-2xl"
          role="status"
          aria-live="polite"
        >
          {deleteFeedback}
        </div>
      )}
    </>
  );
};
