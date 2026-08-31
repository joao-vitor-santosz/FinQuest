import { Search } from "lucide-react";
import type { BillsFilters as BillsFiltersState } from "../types";
import type { BillsFiltersProps } from "./types";

const fieldClassName =
  "min-w-0 rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none transition-colors focus:border-income";

export const BillsFilters = ({
  filters,
  categories,
  onChange,
}: BillsFiltersProps) => (
  <section
    className="animate-page-content-enter rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6"
    style={{ animationDelay: "200ms" }}
  >
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">Organizar contas</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Consulte compromissos por vencimento, status e categoria.
        </p>
      </div>
      <label className="relative w-full lg:w-72">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="search"
          value={filters.searchTerm}
          onChange={(event) =>
            onChange({ ...filters, searchTerm: event.target.value })
          }
          placeholder="Buscar conta ou categoria..."
          aria-label="Buscar conta ou categoria"
          className="w-full rounded-xl border border-border-glass bg-bg-sidebar py-2 pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-text-muted focus:border-income"
        />
      </label>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      <select
        value={filters.status}
        onChange={(event) =>
          onChange({ ...filters, status: event.target.value as BillsFiltersState["status"] })
        }
        className={fieldClassName}
        aria-label="Filtrar por status"
      >
        <option value="all">Todos os status</option>
        <option value="pending">Pendentes</option>
        <option value="overdue">Atrasadas</option>
        <option value="paid">Pagas</option>
      </select>
      <select
        value={filters.type}
        onChange={(event) =>
          onChange({ ...filters, type: event.target.value as BillsFiltersState["type"] })
        }
        className={fieldClassName}
        aria-label="Filtrar por tipo"
      >
        <option value="all">Todos os tipos</option>
        <option value="expense">A pagar</option>
        <option value="income">A receber</option>
      </select>
      <select
        value={filters.category}
        onChange={(event) => onChange({ ...filters, category: event.target.value })}
        className={fieldClassName}
        aria-label="Filtrar por categoria"
      >
        <option value="all">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={filters.period}
        onChange={(event) =>
          onChange({ ...filters, period: event.target.value as BillsFiltersState["period"] })
        }
        className={fieldClassName}
        aria-label="Filtrar por período"
      >
        <option value="all">Qualquer período</option>
        <option value="today">Vencem hoje</option>
        <option value="7d">Próximos 7 dias</option>
        <option value="month">Este mês</option>
      </select>
    </div>
  </section>
);
