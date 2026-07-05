import { X } from "lucide-react";
import { useTransactionForm } from "./add-transaction-form.schema";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import type { TransactionFormData } from "./add-transaction-form.schema";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
}: AddTransactionModalProps) => {
  // Importamos o hook atualizado que agora já conhece o campo 'date'
  const { register, handleSubmit, errors, setValue, watch, reset } =
    useTransactionForm();
  const { handleAddTransiction } = useContext(TransactionContext);

  // Monitora o tipo selecionado para estilizar os botões
  const selectedType = watch("type");

  if (!isOpen) return null;

  const onSubmit = (data: TransactionFormData) => {
    handleAddTransiction(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md p-6 rounded-2xl bg-bg-card/80 border border-border-glass backdrop-blur-md flex flex-col gap-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">Nova Transação</h3>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo: Descrição */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Descrição
            </label>
            <input
              {...register("description")}
              type="text"
              placeholder="Ex: Supermercado, Salário..."
              className={`w-full px-4 py-3 rounded-xl bg-bg-sidebar/60 border text-white placeholder:text-text-secondary/60 focus:outline-none transition-all ${
                errors.description
                  ? "border-expense focus:ring-1 focus:ring-expense"
                  : "border-border-glass/40 focus:border-income"
              }`}
            />
            {errors.description && (
              <span className="text-xs text-expense font-medium pl-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Campo: Valor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Valor (R$)
            </label>
            <input
              {...register("amount")}
              type="text"
              placeholder="0,00"
              className={`w-full px-4 py-3 rounded-xl bg-bg-sidebar/60 border text-white placeholder:text-text-secondary/60 focus:outline-none transition-all ${
                errors.amount
                  ? "border-expense focus:ring-1 focus:ring-expense"
                  : "border-border-glass/40 focus:border-income"
              }`}
            />
            {errors.amount && (
              <span className="text-xs text-expense font-medium pl-1">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Campo: Data da Transação */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Data
            </label>
            <input
              {...register("date")}
              type="date"
              className={`w-full px-4 py-3 rounded-xl bg-bg-sidebar/60 border text-white focus:outline-none transition-all scheme-dark ${
                errors.date
                  ? "border-expense focus:ring-1 focus:ring-expense"
                  : "border-border-glass/40 focus:border-income"
              }`}
            />
            {errors.date && (
              <span className="text-xs text-expense font-medium pl-1">
                {errors.date.message}
              </span>
            )}
          </div>

          {/* Campo: Tipo (Entrada/Saída) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">
              Tipo
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue("type", "income")}
                className={`py-3 rounded-xl font-medium text-sm transition-all border cursor-pointer ${
                  selectedType === "income"
                    ? "bg-income/20 border-income text-income"
                    : "bg-transparent border-border-glass/40 text-text-secondary hover:border-income/40"
                }`}
              >
                Entrada
              </button>
              <button
                type="button"
                onClick={() => setValue("type", "expense")}
                className={`py-3 rounded-xl font-medium text-sm transition-all border cursor-pointer ${
                  selectedType === "expense"
                    ? "bg-expense/20 border-expense text-expense"
                    : "bg-transparent border-border-glass/40 text-text-secondary hover:border-expense/40"
                }`}
              >
                Saída
              </button>
            </div>
            {errors.type && (
              <span className="text-xs text-expense font-medium pl-1">
                {errors.type.message}
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="flex-1 py-3 rounded-xl border border-border-glass/40 text-text-secondary font-medium transition-all hover:bg-white/5 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-income text-bg-card font-semibold transition-all hover:opacity-90 shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
