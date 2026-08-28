import { AddTransactionModal } from "../AddTransactionModal";
import { ActionFeedback } from "../ActionFeedback";
import { ConfirmationModal } from "../ConfirmationModal";
import { ArchiveDetails } from "./ArchiveDetails";
import { ExportDetails } from "./ExportDetails";
import { ReceiptDetails } from "./ReceiptDetails";
import { TransactionDetails } from "./TransactionDetails";
import {
  ExportArchiveList,
  ReceiptArchiveList,
  TransactionArchiveList,
} from "./ArchiveLists";
import { FilesListPanel } from "./FilesListPanel";
import { FilesPageHeader } from "./FilesPageHeader";
import { FilesTabs } from "./FilesTabs";
import { ExportCsvModal } from "./ExportCsvModal";
import { useFilesPage } from "./useFilesPage";

export const FilesPage = () => {
  const { fileInputRef, detailPanelRef, state, data, actions } = useFilesPage();

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <FilesPageHeader
        activeTab={state.activeTab}
        canCreateExport={data.transactions.length > 0}
        onSelectReceipts={actions.openReceiptPicker}
        onNewTransaction={actions.openNewTransactionModal}
        onCreateExport={actions.openExportModal}
      />
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        aria-label="Selecionar comprovantes"
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        multiple
        onChange={actions.handleReceiptInputChange}
      />
      <FilesTabs
        activeTab={state.activeTab}
        counts={data.counts}
        onChange={actions.handleTabChange}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6">
        <FilesListPanel
          activeTab={state.activeTab}
          activeTitle={data.activeTitle}
          activeCount={data.activeCount}
          searchTerm={state.searchTerm}
          transactionType={state.transactionType}
          onSearchChange={actions.setSearchTerm}
          onTransactionTypeChange={actions.setTransactionType}
        >
          {state.activeTab === "receipts" && (
            <ReceiptArchiveList
              receipts={data.filteredReceipts}
              transactions={data.transactions}
              selectedReceiptId={data.selectedReceipt?.id ?? null}
              isDraggingFile={state.isDraggingFile}
              uploadFeedback={state.uploadFeedback}
              onSelectFiles={actions.openReceiptPicker}
              onDraggingChange={actions.setIsDraggingFile}
              onFilesDropped={actions.handleReceiptFiles}
              onSelectReceipt={actions.selectReceipt}
            />
          )}
          {state.activeTab === "transactions" && (
            <TransactionArchiveList
              transactions={data.filteredTransactions}
              receipts={data.receipts}
              selectedTransactionId={data.selectedTransaction?.id ?? null}
              onSelectTransaction={actions.selectTransaction}
            />
          )}
          {state.activeTab === "exports" && (
            <ExportArchiveList
              exports={data.filteredExports}
              selectedExportId={data.selectedExport?.id ?? null}
              onSelectExport={actions.selectExport}
            />
          )}
        </FilesListPanel>

        <ArchiveDetails
          ref={detailPanelRef}
        >
          {state.activeTab === "receipts" && (
            <ReceiptDetails
              receipt={data.selectedReceipt}
              transactions={data.transactions}
              linkedTransaction={data.selectedReceiptTransaction}
              onLinkTransaction={actions.linkReceiptToTransaction}
              onRemove={actions.requestReceiptDeletion}
            />
          )}
          {state.activeTab === "transactions" && (
            <TransactionDetails
              transaction={data.selectedTransaction}
              receipts={data.selectedTransactionReceipts}
              onOpenReceipt={actions.openLinkedReceipt}
              onEdit={actions.openEditTransactionModal}
            />
          )}
          {state.activeTab === "exports" && (
            <ExportDetails
              exportRecord={data.selectedExport}
              onRemove={actions.requestExportDeletion}
            />
          )}
        </ArchiveDetails>
      </div>

      <AddTransactionModal
        isOpen={state.isTransactionModalOpen}
        transaction={state.transactionBeingEdited}
        onClose={actions.closeTransactionModal}
      />
      <ConfirmationModal
        isOpen={state.pendingDeletion !== null}
        title={
          state.pendingDeletion?.kind === "receipt"
            ? "Excluir comprovante?"
            : "Excluir exportação?"
        }
        description={
          <>
            O arquivo{" "}
            <strong className="font-medium text-white">
              {state.pendingDeletion?.name}
            </strong>{" "}
            será excluído permanentemente.
          </>
        }
        confirmLabel="Excluir"
        onCancel={actions.cancelDeletion}
        onConfirm={actions.confirmDeletion}
      />
      <ActionFeedback
        message={state.deleteFeedback}
        onDismiss={actions.dismissDeleteFeedback}
      />
      <ExportCsvModal
        isOpen={state.isExportModalOpen}
        selectedDate={state.exportDate}
        transactionCount={data.exportTransactionCount}
        onDateChange={actions.setExportDate}
        onCancel={actions.closeExportModal}
        onConfirm={actions.handleCreateExport}
      />
    </div>
  );
};
