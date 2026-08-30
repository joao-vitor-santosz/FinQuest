import { FileSpreadsheet, FolderOpen, Plus, Upload } from "lucide-react";
import { type FilesPageHeaderProps, actionClassName } from "./types/index";


export const FilesPageHeader = ({
  activeTab,
  canCreateExport,
  onSelectReceipts,
  onNewTransaction,
  onCreateExport,
}: FilesPageHeaderProps) => (
  <div
    className="animate-page-content-enter flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    style={{ animationDelay: "80ms" }}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-income/30 bg-income/10 text-income shadow-[0_0_18px_rgba(34,197,94,0.18)]">
        <FolderOpen size={27} />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Arquivos
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Organize comprovantes, registros e exportações.
        </p>
      </div>
    </div>

    {activeTab === "receipts" && (
      <button
        type="button"
        onClick={onSelectReceipts}
        className={actionClassName}
      >
        <Upload size={18} />
        Enviar comprovante
      </button>
    )}
    {activeTab === "transactions" && (
      <button
        type="button"
        onClick={onNewTransaction}
        className={actionClassName}
      >
        <Plus size={18} />
        Nova transação
      </button>
    )}
    {activeTab === "exports" && (
      <button
        type="button"
        onClick={onCreateExport}
        disabled={!canCreateExport}
        className={`${actionClassName} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:text-bg-card disabled:hover:opacity-40 disabled:hover:shadow-none`}
      >
        <FileSpreadsheet size={18} />
        Gerar CSV
      </button>
    )}
  </div>
);
