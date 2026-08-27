export type CalendarTransactionFilter = "all" | "income" | "expense";

interface TransactionHistoryFiltersProps {
  value: CalendarTransactionFilter;
  onChange: (value: CalendarTransactionFilter) => void;
  selectedDay: number | null;
  onClearSelectedDay: () => void;
  className?: string;
  animationDelay?: string;
}

export const TransactionHistoryFilters = ({
  value,
  onChange,
  selectedDay,
  onClearSelectedDay,
  className = "",
  animationDelay,
}: TransactionHistoryFiltersProps) => (
  <div
    className={`flex max-w-full flex-col items-start overflow-x-hidden text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 ${className}`}
    style={{ animationDelay }}
  >
    <label className="flex items-center gap-3">
      Exibir
      <select
        className="rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as CalendarTransactionFilter)
        }
        aria-label="Filtrar movimentações do histórico"
      >
        <option value="all">Todas as movimentações</option>
        <option value="income">Entradas</option>
        <option value="expense">Saídas</option>
      </select>
    </label>
    <div
      className={`relative w-32 overflow-hidden transition-[height,margin] duration-300 ease-in-out sm:h-10 ${selectedDay !== null ? "mt-2 h-10 mr-0 sm:mt-0" : "pointer-events-none -mr-32 h-0 mt-0"}`}
    >
      <button
        type="button"
        className={`absolute right-0 top-0 h-10 w-full whitespace-nowrap rounded-xl border border-border-glass px-3 text-sm text-white transition-[transform,opacity,background-color] duration-300 ease-in-out hover:bg-white/5 cursor-pointer ${selectedDay !== null ? "translate-x-0 opacity-100" : "translate-x-0 opacity-0 lg:translate-x-full lg:opacity-100"}`}
        onClick={onClearSelectedDay}
      >
        Mês inteiro
      </button>
    </div>
  </div>
);
