import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { downloadBlob } from "../../../utils/export-transactions-csv";
import {
  formatDate,
  formatFileSize,
  formatTransactionDate,
} from "../files-page-utils";
import type { ExportDetailsProps } from "../types";

export const ExportDetails = ({
  exportRecord,
  onRemove,
}: ExportDetailsProps) => {
  if (!exportRecord) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <FileSpreadsheet size={40} className="mb-3 text-text-muted" />
        <p className="font-medium text-white">Detalhes da exportação</p>
        <p className="mt-1 text-sm text-text-secondary">
          Gere ou selecione um CSV para consultar seus detalhes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-income">
        Arquivo gerado
      </p>
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-income/30 bg-income/10 text-income shadow-[0_0_24px_rgba(34,197,94,0.15)]">
          <FileSpreadsheet size={38} />
        </div>
        <h2 className="mt-5 wrap-break-word text-lg font-semibold text-white">
          {exportRecord.name}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Planilha CSV · {formatFileSize(exportRecord.size)}
        </p>
      </div>
      <dl className="mt-8 space-y-3 rounded-xl border border-border-glass/60 bg-bg-sidebar/35 p-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Criado em</dt>
          <dd className="font-medium text-white">
            {formatDate(exportRecord.createdAt)}
          </dd>
        </div>
        {exportRecord.referenceDate && (
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">Data exportada</dt>
            <dd className="font-medium text-white">
              {formatTransactionDate(exportRecord.referenceDate)}
            </dd>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Registros</dt>
          <dd className="font-medium text-white">
            {exportRecord.transactionCount}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Formato</dt>
          <dd className="font-medium text-white">CSV UTF-8</dd>
        </div>
      </dl>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => downloadBlob(exportRecord.blob, exportRecord.name)}
          className="flex items-center justify-center gap-2 rounded-xl bg-income px-3 py-2.5 text-sm font-semibold text-bg-card transition-opacity hover:opacity-90 cursor-pointer"
        >
          <Download size={17} />
          Baixar
        </button>
        <button
          type="button"
          onClick={() => onRemove(exportRecord.id)}
          className="flex items-center justify-center gap-2 rounded-xl border border-expense/30 px-3 py-2.5 text-sm font-medium text-expense transition-colors hover:bg-expense/10 cursor-pointer"
        >
          <Trash2 size={17} />
          Excluir
        </button>
      </div>
    </div>
  );
};
