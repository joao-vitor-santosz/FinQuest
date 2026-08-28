import { useSearch } from "@tanstack/react-router";
import { useContext, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ArchiveContext } from "../../../context/archive-context";
import { TransactionContext } from "../../../context/TransactionContext";
import type { TransactionTypes } from "../../../interfaces/transactions";
import {
  acceptedReceiptTypes,
  filesTabs,
  formatTransactionDate,
  maximumReceiptCount,
  maximumReceiptSize,
  maximumReceiptStorage,
  paymentMethodLabels,
} from "../files-page-utils";
import type {
  FilesTab,
  PendingArchiveDeletion,
  TransactionTypeFilter,
  UploadFeedback,
} from "../types";

export const useFilesPage = () => {
  const { tab: initialTab } = useSearch({ from: "/_app/files" });
  const {
    receipts,
    exports,
    addReceiptFiles,
    removeReceipt,
    linkReceiptToTransaction,
    createTransactionExport,
    removeExport,
  } = useContext(ArchiveContext);
  const { transactions } = useContext(TransactionContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const detailPanelRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<FilesTab>(initialTab ?? "receipts");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] =
    useState<TransactionTypeFilter>("all");
  const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [selectedExportId, setSelectedExportId] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadFeedback, setUploadFeedback] =
    useState<UploadFeedback | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<TransactionTypes | null>(null);
  const [pendingDeletion, setPendingDeletion] =
    useState<PendingArchiveDeletion | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportDate, setExportDate] = useState("");

  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("pt-BR");
  const filteredReceipts = receipts.filter((receipt) => {
    const linkedTransaction = transactions.find(
      (transaction) => transaction.id === receipt.transactionId,
    );

    return (
      normalizedSearchTerm.length === 0 ||
      receipt.name.toLocaleLowerCase("pt-BR").includes(normalizedSearchTerm) ||
      linkedTransaction?.description
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearchTerm)
    );
  });
  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transactionType === "all" || transaction.type === transactionType,
    )
    .filter(
      (transaction) =>
        normalizedSearchTerm.length === 0 ||
        transaction.description
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearchTerm) ||
        transaction.date.includes(normalizedSearchTerm) ||
        formatTransactionDate(transaction.date).includes(normalizedSearchTerm) ||
        paymentMethodLabels[transaction.paymentMethod]
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearchTerm),
    )
    .sort((firstTransaction, secondTransaction) =>
      secondTransaction.date.localeCompare(firstTransaction.date),
    );
  const filteredExports = exports.filter(
    (exportRecord) =>
      normalizedSearchTerm.length === 0 ||
      exportRecord.name
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearchTerm),
  );

  const selectedReceipt =
    filteredReceipts.find((receipt) => receipt.id === selectedReceiptId) ??
    filteredReceipts[0] ??
    null;
  const selectedTransaction =
    filteredTransactions.find(
      (transaction) => transaction.id === selectedTransactionId,
    ) ??
    filteredTransactions[0] ??
    null;
  const selectedExport =
    filteredExports.find((item) => item.id === selectedExportId) ??
    filteredExports[0] ??
    null;
  const selectedReceiptTransaction = selectedReceipt
    ? transactions.find(
        (transaction) => transaction.id === selectedReceipt.transactionId,
      ) ?? null
    : null;
  const selectedTransactionReceipts = selectedTransaction
    ? receipts.filter(
        (receipt) => receipt.transactionId === selectedTransaction.id,
      )
    : [];
  const transactionsForExport = transactions.filter(
    (transaction) => transaction.date === exportDate,
  );

  const handleTabChange = (tab: FilesTab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setUploadFeedback(null);
  };

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

  const handleReceiptFiles = (files: File[]) => {
    let availableStorage =
      maximumReceiptStorage -
      receipts.reduce((total, receipt) => total + receipt.size, 0);
    let availableSlots = maximumReceiptCount - receipts.length;
    const validFiles: File[] = [];

    files.forEach((file) => {
      const hasAcceptedExtension = /\.(pdf|png|jpe?g|webp)$/i.test(file.name);
      const isValid =
        (acceptedReceiptTypes.has(file.type) || hasAcceptedExtension) &&
        file.size <= maximumReceiptSize &&
        file.size <= availableStorage &&
        availableSlots > 0;

      if (isValid) {
        validFiles.push(file);
        availableStorage -= file.size;
        availableSlots -= 1;
      }
    });
    const rejectedCount = files.length - validFiles.length;

    if (validFiles.length === 0) {
      setUploadFeedback({
        message:
          "Use PDF, PNG, JPG ou WEBP com até 10 MB. O limite da sessão é de 30 arquivos ou 100 MB.",
        isError: true,
      });
      return;
    }

    const newReceipts = addReceiptFiles(validFiles);
    setSelectedReceiptId(newReceipts[0].id);
    revealDetailPanel();
    setUploadFeedback({
      message:
        rejectedCount > 0
          ? `${validFiles.length} arquivo(s) enviado(s). ${rejectedCount} ignorado(s).`
          : `${validFiles.length} comprovante(s) enviado(s) com sucesso.`,
      isError: rejectedCount > 0,
    });
  };

  const handleReceiptInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleReceiptFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const openExportModal = () => {
    const latestTransactionDate = transactions.reduce(
      (latestDate, transaction) =>
        transaction.date > latestDate ? transaction.date : latestDate,
      "",
    );

    setExportDate(latestTransactionDate);
    setIsExportModalOpen(true);
  };

  const handleCreateExport = () => {
    if (transactionsForExport.length === 0 || exportDate.length === 0) {
      return;
    }

    const exportRecord = createTransactionExport(
      transactionsForExport,
      exportDate,
    );
    setSelectedExportId(exportRecord.id);
    setIsExportModalOpen(false);
    revealDetailPanel();
  };

  const selectReceipt = (receiptId: string) => {
    setSelectedReceiptId(receiptId);
    revealDetailPanel();
  };

  const selectTransaction = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    revealDetailPanel();
  };

  const selectExport = (exportId: string) => {
    setSelectedExportId(exportId);
    revealDetailPanel();
  };

  const openNewTransactionModal = () => {
    setTransactionBeingEdited(null);
    setIsTransactionModalOpen(true);
  };

  const openEditTransactionModal = (transaction: TransactionTypes) => {
    setTransactionBeingEdited(transaction);
    setIsTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setTransactionBeingEdited(null);
  };

  const openLinkedReceipt = (receiptId: string) => {
    setSelectedReceiptId(receiptId);
    handleTabChange("receipts");
    revealDetailPanel();
  };

  const requestReceiptDeletion = (receiptId: string) => {
    const receipt = receipts.find((item) => item.id === receiptId);

    if (receipt) {
      setPendingDeletion({
        kind: "receipt",
        id: receipt.id,
        name: receipt.name,
      });
    }
  };

  const requestExportDeletion = (exportId: string) => {
    const exportRecord = exports.find((item) => item.id === exportId);

    if (exportRecord) {
      setPendingDeletion({
        kind: "export",
        id: exportRecord.id,
        name: exportRecord.name,
      });
    }
  };

  const confirmDeletion = () => {
    if (!pendingDeletion) {
      return;
    }

    if (pendingDeletion.kind === "receipt") {
      removeReceipt(pendingDeletion.id);
      setDeleteFeedback("Comprovante excluído com sucesso.");
    } else {
      removeExport(pendingDeletion.id);
      setDeleteFeedback("Exportação excluída com sucesso.");
    }

    setPendingDeletion(null);
  };

  const activeItems = {
    receipts: filteredReceipts,
    transactions: filteredTransactions,
    exports: filteredExports,
  };
  const counts = {
    receipts: receipts.length,
    transactions: transactions.length,
    exports: exports.length,
  };
  const activeTitle =
    filesTabs.find((tab) => tab.id === activeTab)?.label ?? "Arquivos";

  return {
    fileInputRef,
    detailPanelRef,
    state: {
      activeTab,
      searchTerm,
      transactionType,
      isDraggingFile,
      uploadFeedback,
      isTransactionModalOpen,
      transactionBeingEdited,
      pendingDeletion,
      deleteFeedback,
      isExportModalOpen,
      exportDate,
    },
    data: {
      receipts,
      transactions,
      filteredReceipts,
      filteredTransactions,
      filteredExports,
      selectedReceipt,
      selectedTransaction,
      selectedExport,
      selectedReceiptTransaction,
      selectedTransactionReceipts,
      activeCount: activeItems[activeTab].length,
      activeTitle,
      counts,
      exportTransactionCount: transactionsForExport.length,
    },
    actions: {
      handleTabChange,
      setSearchTerm,
      setTransactionType,
      setIsDraggingFile,
      handleReceiptFiles,
      handleReceiptInputChange,
      openExportModal,
      handleCreateExport,
      setExportDate,
      closeExportModal: () => setIsExportModalOpen(false),
      selectReceipt,
      selectTransaction,
      selectExport,
      openNewTransactionModal,
      openEditTransactionModal,
      closeTransactionModal,
      openLinkedReceipt,
      requestReceiptDeletion,
      requestExportDeletion,
      cancelDeletion: () => setPendingDeletion(null),
      confirmDeletion,
      dismissDeleteFeedback: () => setDeleteFeedback(null),
      linkReceiptToTransaction,
      openReceiptPicker: () => fileInputRef.current?.click(),
    },
  };
};
