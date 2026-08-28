import { filesTabs } from "../files-page-utils";
import type { FilesTab } from "../types";

interface FilesTabsProps {
  activeTab: FilesTab;
  counts: Record<FilesTab, number>;
  onChange: (tab: FilesTab) => void;
}

export const FilesTabs = ({
  activeTab,
  counts,
  onChange,
}: FilesTabsProps) => (
  <div
    className="animate-page-content-enter overflow-x-auto border-b border-border-glass scrollbar-hide"
    style={{ animationDelay: "140ms" }}
  >
    <div className="flex min-w-max gap-2" aria-label="Categorias de arquivos">
      {filesTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${isActive ? "text-white" : "text-text-secondary hover:text-white"}`}
          >
            <Icon size={18} />
            {tab.label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-income/15 text-income" : "bg-white/5 text-text-muted"}`}
            >
              {counts[tab.id]}
            </span>
            <span
              className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-income transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
            />
          </button>
        );
      })}
    </div>
  </div>
);
