import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { ConfirmationModalProps } from "./types";

export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  confirmDisabled = false,
  confirmVariant = "danger",
  children,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    cancelButtonRef.current?.focus();

    return () => previouslyFocusedElement?.focus();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onCancel();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
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
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border-glass bg-bg-card p-6 shadow-2xl"
        role={confirmVariant === "danger" ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onKeyDown={handleKeyDown}
      >
        <h2 id={titleId} className="text-xl font-semibold text-white">
          {title}
        </h2>
        <div id={descriptionId} className="mt-3 text-text-secondary">
          {description}
        </div>
        {children}
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            className="rounded-xl px-4 py-2 font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            onClick={onCancel}
          >
            Voltar
          </button>
          <button
            type="button"
            className={`rounded-xl px-4 py-2 font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${confirmVariant === "danger" ? "bg-expense text-white" : "bg-income text-bg-card"}`}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
