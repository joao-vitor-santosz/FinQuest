export type CalendarTransactionFilter = "all" | "income" | "expense";

interface TransactionHistoryFiltersProps {
  value: CalendarTransactionFilter;
  onChange: (value: CalendarTransactionFilter) => void;
  selectedDay: number | null;
  onClearSelectedDay: () => void;
}

export const TransactionHistoryFilters = ({
  value,
  onChange,
  selectedDay,
  onClearSelectedDay,
}: TransactionHistoryFiltersProps) => (
  <div className="flex max-w-full flex-wrap items-center gap-2 overflow-x-hidden text-sm text-text-secondary">
    <label
      className={`flex items-center gap-3 transition-transform duration-300 ${selectedDay !== null ? "-translate-x-1" : "translate-x-0"}`}
    >
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
      className={`relative h-10 w-32 overflow-hidden transition-[margin] duration-300 ease-in-out ${selectedDay !== null ? "mr-0" : "pointer-events-none -mr-32"}`}
    >
      <button
        type="button"
        className={`absolute right-0 top-0 h-10 w-full whitespace-nowrap rounded-xl border border-border-glass px-3 text-sm text-white transition-[transform,background-color] duration-300 ease-in-out hover:bg-white/5 cursor-pointer ${selectedDay !== null ? "translate-x-0" : "translate-x-full"}`}
        onClick={onClearSelectedDay}
      >
        Mês inteiro
      </button>
    </div>
  </div>
);
