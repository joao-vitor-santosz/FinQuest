import { ConfirmationModal } from "../../ConfirmationModal";
import type { ExportCsvModalProps } from "../types";

export const ExportCsvModal = ({
  isOpen,
  selectedDate,
  transactionCount,
  onDateChange,
  onCancel,
  onConfirm,
}: ExportCsvModalProps) => (
  <ConfirmationModal
    isOpen={isOpen}
    title="Gerar arquivo CSV"
    description="Escolha o dia das transações que serão incluídas no arquivo."
    confirmLabel="Gerar CSV"
    confirmVariant="primary"
    confirmDisabled={transactionCount === 0}
    onCancel={onCancel}
    onConfirm={onConfirm}
  >
    <label className="mt-5 block text-sm font-medium text-text-secondary">
      Data das transações
      <input
        type="date"
        value={selectedDate}
        onChange={(event) => onDateChange(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2.5 text-white outline-none transition-colors focus:border-income"
      />
    </label>
    <p
      className={`mt-3 rounded-xl border px-3 py-2 text-sm ${transactionCount > 0 ? "border-income/30 bg-income/10 text-green-200" : "border-border-glass bg-bg-sidebar/40 text-text-secondary"}`}
      role="status"
    >
      {transactionCount === 0
        ? "Nenhuma transação encontrada nesta data."
        : transactionCount === 1
          ? "1 transação será incluída no arquivo."
          : `${transactionCount} transações serão incluídas no arquivo.`}
    </p>
  </ConfirmationModal>
);
