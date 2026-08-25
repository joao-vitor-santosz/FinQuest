import {
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
  Pencil,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionBottomSheet } from "../TransactionBottomSheet";
import formatCurrency from "../../utils/format-currency";
import { AddTransactionModal } from "../AddTransactionModal";
import type { TransactionTypes } from "../../interfaces/transactions";

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
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<TransactionTypes | null>(null);
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
      <div className="relative flex h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:h-auto sm:max-h-112.5 sm:p-6">
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">Transações</h3>
          {isDeleteMode ? (
            <div className="animate-delete-selection-enter flex items-center gap-3 sm:gap-5">
              <button
                className="text-base font-medium text-text-secondary transition-colors hover:text-white sm:text-lg cursor-pointer"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button
                className="text-base font-semibold text-expense transition-colors hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg cursor-pointer"
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
            <span className="text-base sm:text-lg">Excluir todas</span>
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
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-8 pr-1 scrollbar-hide sm:pb-0">
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
                className="group relative flex items-center justify-between p-3 rounded-xl bg-bg-sidebar/40 border transition-all shrink-0 border-border-glass/30 hover:border-border-glass"
              >
                {/* Lado Esquerdo: Ícone + Título/Data */}
                <li className="flex w-[calc(58%-1.5rem)] flex-none items-center gap-3 sm:w-[calc(50%-1.5rem)] sm:gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-white sm:text-md">
                      {transaction.description}
                    </span>
                    <span className="truncate text-xs text-text-secondary sm:hidden">
                      {transaction.date}
                    </span>
                    <span className="truncate text-xs text-text-secondary sm:hidden">
                      {transaction.paymentMethod}
                    </span>
                    <span className="hidden truncate text-sm text-text-secondary sm:block">
                      {transaction.date} - {transaction.paymentMethod}
                    </span>
                  </div>
                </li>

                {/* Lado Direito: Valor */}
                <span
                  className={`ml-3 shrink-0 text-sm font-semibold sm:text-lg ${transaction.type === "income" ? "text-income" : "text-expense"}`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
                {!isDeleteMode && (
                  <button
                    className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-1.5 text-text-secondary opacity-100 transition-all hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none sm:left-1/2 sm:p-2 sm:pointer-events-none sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 sm:focus-visible:pointer-events-auto sm:focus-visible:opacity-100 cursor-pointer"
                    onClick={() => setTransactionBeingEdited(transaction)}
                    aria-label={`Editar ${transaction.description}`}
                  >
                    <Pencil size={18} />
                  </button>
                )}
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

        {filteredTransactions.length > 5 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 justify-center sm:static sm:mt-3 sm:translate-x-0 sm:shrink-0">
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
      <AddTransactionModal
        isOpen={transactionBeingEdited !== null}
        transaction={transactionBeingEdited}
        onClose={() => setTransactionBeingEdited(null)}
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
          className="animate-delete-feedback fixed bottom-20 right-4 z-1001 rounded-xl border border-income/30 bg-bg-card px-4 py-3 text-sm font-medium text-white shadow-2xl sm:bottom-6 sm:right-6"
          role="status"
          aria-live="polite"
        >
          {deleteFeedback}
        </div>
      )}
    </>
  );
};
