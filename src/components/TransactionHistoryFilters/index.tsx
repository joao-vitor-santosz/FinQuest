export const TransactionHistoryFilters = () => (
  <label className="flex items-center gap-3 text-sm text-text-secondary">
    Exibir
    <select
      className="rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none"
      defaultValue="all"
      aria-label="Filtrar movimentações do histórico"
    >
      <option value="all">Todas as movimentações</option>
      <option value="income">Entradas</option>
      <option value="expense">Saídas</option>
    </select>
  </label>
);
