import { Search } from "lucide-react";
import type { ReactNode } from "react";
import type { FilesTab, TransactionTypeFilter } from "../types";

interface FilesListPanelProps {
  activeTab: FilesTab;
  activeTitle: string;
  activeCount: number;
  searchTerm: string;
  transactionType: TransactionTypeFilter;
  onSearchChange: (value: string) => void;
  onTransactionTypeChange: (value: TransactionTypeFilter) => void;
  children: ReactNode;
}

export const FilesListPanel = ({
  activeTab,
  activeTitle,
  activeCount,
  searchTerm,
  transactionType,
  onSearchChange,
  onTransactionTypeChange,
  children,
}: FilesListPanelProps) => (
  <section
    className="animate-page-content-enter min-w-0 rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6"
    style={{ animationDelay: "200ms" }}
  >
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{activeTitle}</h2>
        <p className="mt-1 text-sm text-text-secondary">
          {activeCount === 1 ? "1 item encontrado" : `${activeCount} itens encontrados`}
        </p>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <label className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="search"
            aria-label={`Buscar em ${activeTitle.toLocaleLowerCase("pt-BR")}`}
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={`Buscar em ${activeTitle.toLocaleLowerCase("pt-BR")}...`}
            className="w-full rounded-xl border border-border-glass bg-bg-sidebar py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-text-muted focus:border-income"
          />
        </label>
        {activeTab === "transactions" && (
          <select
            value={transactionType}
            onChange={(event) =>
              onTransactionTypeChange(
                event.target.value as TransactionTypeFilter,
              )
            }
            className="min-w-0 rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none focus:border-income"
            aria-label="Filtrar transações por tipo"
          >
            <option value="all">Todas</option>
            <option value="income">Entradas</option>
            <option value="expense">Saídas</option>
          </select>
        )}
      </div>
    </div>
    {children}
  </section>
);
