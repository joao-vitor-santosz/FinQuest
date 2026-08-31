import { useContext, useState } from "react";
import { BillsContext } from "../../../context/bills-context";
import type { Bill, BillInput } from "../../../interfaces/bills";
import { getBillSummaryCounts } from "../bill-utils";

export const useBillsPage = () => {
  const { bills, addBill, updateBill, removeBill } = useContext(BillsContext);
  const [billBeingEdited, setBillBeingEdited] = useState<Bill | null>(null);
  const [isBillFormOpen, setIsBillFormOpen] = useState(false);
  const [billPendingDeletion, setBillPendingDeletion] = useState<Bill | null>(
    null,
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const openNewBillForm = () => {
    setBillBeingEdited(null);
    setIsBillFormOpen(true);
  };

  const openEditBillForm = (bill: Bill) => {
    setBillBeingEdited(bill);
    setIsBillFormOpen(true);
  };

  const closeBillForm = () => {
    setBillBeingEdited(null);
    setIsBillFormOpen(false);
  };

  const saveBill = (data: BillInput) => {
    if (billBeingEdited) {
      updateBill(billBeingEdited.id, data);
      setFeedback("Conta atualizada com sucesso.");
    } else {
      addBill(data);
      setFeedback("Conta cadastrada com sucesso.");
    }

    closeBillForm();
  };

  const confirmBillDeletion = () => {
    if (!billPendingDeletion) {
      return;
    }

    removeBill(billPendingDeletion.id);
    setBillPendingDeletion(null);
    setFeedback("Conta excluída com sucesso.");
  };

  return {
    data: {
      bills,
      summaryCounts: getBillSummaryCounts(bills),
    },
    state: {
      billBeingEdited,
      isBillFormOpen,
      billPendingDeletion,
      feedback,
    },
    actions: {
      openNewBillForm,
      openEditBillForm,
      closeBillForm,
      saveBill,
      requestBillDeletion: setBillPendingDeletion,
      cancelBillDeletion: () => setBillPendingDeletion(null),
      confirmBillDeletion,
      dismissFeedback: () => setFeedback(null),
    },
  };
};
