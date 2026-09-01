import { Plus, WalletCards } from "lucide-react";
import { ActionFeedback } from "../ActionFeedback";
import { ConfirmationModal } from "../ConfirmationModal";
import { BillFormModal } from "./BillFormModal";
import { BillDetails } from "./BillDetails";
import { BillsFilters } from "./BillsFilters";
import { BillsList } from "./BillsList";
import { summaryCards } from "./types";
import { useBillsPage } from "./useBillsPage";

export const BillsPage = () => {
  const { data, state, actions, detailPanelRef } = useBillsPage();

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <div
        className="animate-page-content-enter flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-income/30 bg-income/10 text-income shadow-[0_0_18px_rgba(34,197,94,0.18)]">
            <WalletCards size={27} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              Contas
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Acompanhe vencimentos, parcelas e compromissos financeiros.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={actions.openNewBillForm}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-income px-4 py-2.5 font-semibold text-bg-card transition-all duration-300 hover:-translate-y-1 hover:text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(52,350,0,1)] sm:w-auto cursor-pointer"
        >
          <Plus size={18} />
          Nova conta
        </button>
      </div>

      <div
        className="animate-page-content-enter grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        style={{ animationDelay: "140ms" }}
      >
        {summaryCards.map(
          ({ key, label, description, icon: Icon, accentClassName }) => (
            <section
              key={key}
              className="flex min-w-0 items-center justify-between rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-5"
            >
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {data.summaryCounts[key]}
                </p>
                <p className="mt-1 text-xs text-text-muted">{description}</p>
              </div>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentClassName}`}
              >
                <Icon size={20} />
              </span>
            </section>
          ),
        )}
      </div>

      <BillsFilters
        filters={state.filters}
        categories={data.categories}
        onChange={actions.setFilters}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6">
        <BillsList
          bills={data.filteredBills}
          selectedBillId={data.selectedBill?.id ?? null}
          hasActiveFilters={actions.hasActiveFilters}
          onSelect={actions.selectBill}
        />
        <div ref={detailPanelRef}>
          <BillDetails
            bill={data.selectedBill}
            onPay={actions.requestBillPayment}
            onEdit={actions.openEditBillForm}
            onDelete={actions.requestBillDeletion}
          />
        </div>
      </div>

      <BillFormModal
        key={`${state.isBillFormOpen}-${state.billBeingEdited?.id ?? "new"}`}
        isOpen={state.isBillFormOpen}
        bill={state.billBeingEdited}
        onClose={actions.closeBillForm}
        onSubmit={actions.saveBill}
      />
      <ConfirmationModal
        isOpen={state.billPendingDeletion !== null}
        title="Excluir conta?"
        description={
          <>
            A conta{" "}
            <strong className="font-medium text-white">
              {state.billPendingDeletion?.description}
            </strong>{" "}
            será excluída permanentemente.
          </>
        }
        confirmLabel="Excluir"
        onCancel={actions.cancelBillDeletion}
        onConfirm={actions.confirmBillDeletion}
      />
      <ConfirmationModal
        isOpen={state.billPendingPayment !== null}
        title={
          state.billPendingPayment?.type === "income"
            ? "Confirmar recebimento?"
            : "Confirmar pagamento?"
        }
        description={
          <>
            Ao confirmar, uma transação de{" "}
            <strong className="font-medium text-white">
              {state.billPendingPayment?.type === "income" ? "entrada" : "saída"}
            </strong>{" "}
            será criada e vinculada à conta{" "}
            <strong className="font-medium text-white">
              {state.billPendingPayment?.description}
            </strong>
            .
          </>
        }
        confirmLabel={
          state.billPendingPayment?.type === "income"
            ? "Confirmar recebimento"
            : "Confirmar pagamento"
        }
        confirmVariant="primary"
        onCancel={actions.cancelBillPayment}
        onConfirm={actions.confirmBillPayment}
      >
        <label className="mt-5 block text-sm font-medium text-white">
          Método de pagamento
          <select
            value={state.paymentMethod}
            onChange={(event) =>
              actions.setPaymentMethod(
                event.target.value as typeof state.paymentMethod,
              )
            }
            className="mt-2 w-full rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none transition-colors focus:border-income"
          >
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
          </select>
        </label>
      </ConfirmationModal>
      <ActionFeedback
        message={state.feedback}
        onDismiss={actions.dismissFeedback}
      />
    </div>
  );
};
