import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  billFormSchema,
  getBillFormValues,
  toBillInput,
  type BillFormData,
} from "./bill-form.schema";
import type { BillFormModalProps } from "./types";

const fieldClassName =
  "w-full rounded-xl border bg-bg-sidebar/60 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-text-secondary/60 focus:border-income";

export const BillFormModal = ({
  isOpen,
  bill,
  onClose,
  onSubmit,
}: BillFormModalProps) => {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, formState } =
    useForm<BillFormData>({
      resolver: zodResolver(billFormSchema),
      defaultValues: getBillFormValues(bill),
      mode: "onBlur",
    });
  const [hasInstallments, setHasInstallments] = useState(
    Boolean(bill?.installment),
  );
  const hasInstallmentsField = register("hasInstallments");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-2xl border border-border-glass bg-bg-card/90 p-4 shadow-2xl backdrop-blur-md sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-semibold text-white">
            {bill ? "Editar conta" : "Nova conta"}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            aria-label="Fechar modal de conta"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit((data) => onSubmit(toBillInput(data)))}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary sm:col-span-2">
              Descrição
              <input
                {...register("description")}
                className={`${fieldClassName} ${formState.errors.description ? "border-expense" : "border-border-glass"}`}
                placeholder="Ex: Aluguel, mensalidade..."
              />
              {formState.errors.description && (
                <span className="text-xs text-expense">
                  {formState.errors.description.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
              Categoria
              <input
                {...register("category")}
                className={`${fieldClassName} ${formState.errors.category ? "border-expense" : "border-border-glass"}`}
                placeholder="Ex: Moradia"
              />
              {formState.errors.category && (
                <span className="text-xs text-expense">
                  {formState.errors.category.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
              Valor total (R$)
              <input
                {...register("amount")}
                inputMode="decimal"
                className={`${fieldClassName} ${formState.errors.amount ? "border-expense" : "border-border-glass"}`}
                placeholder="0,00"
              />
              {formState.errors.amount && (
                <span className="text-xs text-expense">
                  {formState.errors.amount.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
              Vencimento
              <input
                {...register("dueDate")}
                type="date"
                className={`${fieldClassName} scheme-dark ${formState.errors.dueDate ? "border-expense" : "border-border-glass"}`}
              />
              {formState.errors.dueDate && (
                <span className="text-xs text-expense">
                  {formState.errors.dueDate.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
              Tipo
              <select {...register("type")} className={fieldClassName}>
                <option value="expense">Conta a pagar</option>
                <option value="income">Conta a receber</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary sm:col-span-2">
              Recorrência
              <select {...register("recurrence")} className={fieldClassName}>
                <option value="one-time">Única</option>
                <option value="monthly">Mensal</option>
                <option value="annual">Anual</option>
              </select>
              {formState.errors.recurrence && (
                <span className="text-xs text-expense">
                  {formState.errors.recurrence.message}
                </span>
              )}
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-border-glass bg-bg-sidebar/35 px-3 py-3 text-sm text-white cursor-pointer">
            <input
              {...hasInstallmentsField}
              type="checkbox"
              className="h-4 w-4 accent-income"
              onChange={(event) => {
                hasInstallmentsField.onChange(event);
                setHasInstallments(event.target.checked);
              }}
            />
            Esta conta possui parcelas
          </label>

          {hasInstallments && (
            <div className="grid gap-4 rounded-xl border border-border-glass/70 bg-bg-sidebar/35 p-3 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
                Parcela atual
                <input
                  {...register("installmentCurrent")}
                  type="number"
                  min="1"
                  className={`${fieldClassName} ${formState.errors.installmentCurrent ? "border-expense" : "border-border-glass"}`}
                />
                {formState.errors.installmentCurrent && (
                  <span className="text-xs text-expense">
                    {formState.errors.installmentCurrent.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
                Total de parcelas
                <input
                  {...register("installmentTotal")}
                  type="number"
                  min="2"
                  className={`${fieldClassName} ${formState.errors.installmentTotal ? "border-expense" : "border-border-glass"}`}
                />
                {formState.errors.installmentTotal && (
                  <span className="text-xs text-expense">
                    {formState.errors.installmentTotal.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-text-secondary">
                Valor da parcela
                <input
                  {...register("installmentAmount")}
                  inputMode="decimal"
                  className={`${fieldClassName} ${formState.errors.installmentAmount ? "border-expense" : "border-border-glass"}`}
                  placeholder="0,00"
                />
                {formState.errors.installmentAmount && (
                  <span className="text-xs text-expense">
                    {formState.errors.installmentAmount.message}
                  </span>
                )}
              </label>
            </div>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="rounded-xl bg-income px-4 py-2.5 font-semibold text-bg-card transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              {bill ? "Salvar alterações" : "Cadastrar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
