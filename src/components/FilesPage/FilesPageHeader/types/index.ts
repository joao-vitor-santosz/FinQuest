import type { FilesTab } from "../../types";

export interface FilesPageHeaderProps {
  activeTab: FilesTab;
  canCreateExport: boolean;
  onSelectReceipts: () => void;
  onNewTransaction: () => void;
  onCreateExport: () => void;
}

export const actionClassName =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-income px-4 py-2.5 font-semibold text-bg-card transition-all duration-300 hover:-translate-y-1 hover:text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(52,350,0,1)] sm:w-auto cursor-pointer";