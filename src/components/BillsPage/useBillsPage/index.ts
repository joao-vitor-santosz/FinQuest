import { useContext, useRef, useState } from "react";
import { BillsContext } from "../../../context/bills-context";
import type { Bill, BillInput } from "../../../interfaces/bills";
import { filterBills, getBillCategories } from "../bill-filter-utils";
import { getBillSummaryCounts } from "../bill-utils";
import type { BillsFilters } from "../types";

const initialFilters: BillsFilters = {
  searchTerm: "",
  status: "all",
  type: "all",
  category: "all",
  period: "all",
};

export const useBillsPage = () => {
  const { bills, addBill, updateBill, removeBill } = useContext(BillsContext);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const [billBeingEdited, setBillBeingEdited] = useState<Bill | null>(null);
  const [isBillFormOpen, setIsBillFormOpen] = useState(false);
  const [billPendingDeletion, setBillPendingDeletion] = useState<Bill | null>(
    null,
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [filters, setFilters] = useState<BillsFilters>(initialFilters);
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  const filteredBills = filterBills(bills, filters);
  const selectedBill =
    filteredBills.find((bill) => bill.id === selectedBillId) ??
    filteredBills[0] ??
    null;

  const revealDetailPanel = () => {
    if (!window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      detailPanelRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const selectBill = (billId: string) => {
    setSelectedBillId(billId);
    revealDetailPanel();
  };

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
      filteredBills,
      selectedBill,
      categories: getBillCategories(bills),
      summaryCounts: getBillSummaryCounts(bills),
    },
    state: {
      billBeingEdited,
      isBillFormOpen,
      billPendingDeletion,
      feedback,
      filters,
      selectedBillId,
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
      setFilters,
      selectBill,
      hasActiveFilters: Object.values(filters).some((value) => value !== "all" && value !== ""),
    },
    detailPanelRef,
  };
};
