import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TransactionTypes } from "../../interfaces/transactions";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const monthOptions = Array.from({ length: 12 }, (_, month) => ({
  value: month,
  label: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
    new Date(2026, month, 1),
  ),
}));

interface TransactionCalendarProps {
  displayedDate: Date;
  onDisplayedDateChange: (date: Date) => void;
  transactions: TransactionTypes[];
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
  className?: string;
  animationDelay?: string;
}

export const TransactionCalendar = ({
  displayedDate,
  onDisplayedDateChange,
  transactions,
  selectedDay,
  onDaySelect,
  className = "",
  animationDelay,
}: TransactionCalendarProps) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();
  const minimumYear = currentYear - 20;
  const maximumYear = currentYear + 20;
  const yearOptions = Array.from(
    { length: maximumYear - minimumYear + 1 },
    (_, index) => minimumYear + index,
  );
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(displayedDate);
  const calendarDays = Array.from(
    { length: firstWeekDay + daysInMonth },
    (_, index) => (index < firstWeekDay ? null : index - firstWeekDay + 1),
  );
  const transactionsByDay = new Map<number, TransactionTypes[]>();
  transactions.forEach((transaction) => {
    const day = Number(transaction.date.split("-")[2]);
    const transactionsForDay = transactionsByDay.get(day) ?? [];

    transactionsForDay.push(transaction);
    transactionsByDay.set(day, transactionsForDay);
  });
  const canGoToPreviousMonth = year > minimumYear || month > 0;
  const canGoToNextMonth = year < maximumYear || month < 11;

  const changeMonth = (offset: -1 | 1) => {
    const nextDate = new Date(year, month + offset, 1);

    if (
      nextDate.getFullYear() < minimumYear ||
      nextDate.getFullYear() > maximumYear
    ) {
      return;
    }

    onDisplayedDateChange(nextDate);
  };

  return (
    <section
      className={`rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6 ${className}`}
      style={{ animationDelay }}
    >
      <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="capitalize text-2xl font-semibold text-white sm:text-3xl">
          {monthLabel}
        </h2>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
          <select
            value={month}
            onChange={(event) =>
              onDisplayedDateChange(
                new Date(
                  displayedDate.getFullYear(),
                  Number(event.target.value),
                  1,
                ),
              )
            }
            className="min-w-0 flex-1 rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm capitalize text-white outline-none transition-colors focus:border-income sm:w-28 sm:flex-none"
            aria-label="Selecionar mês"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(event) =>
              onDisplayedDateChange(
                new Date(
                  Number(event.target.value),
                  displayedDate.getMonth(),
                  1,
                ),
              )
            }
            className="min-w-0 flex-1 rounded-xl border border-border-glass bg-bg-sidebar px-3 py-2 text-sm text-white outline-none transition-colors focus:border-income sm:w-24 sm:flex-none"
            aria-label="Selecionar ano"
          >
            {yearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            disabled={!canGoToPreviousMonth}
            className="rounded-xl border border-border-glass p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            disabled={!canGoToNextMonth}
            className="rounded-xl border border-border-glass p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Próximo mês"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <p className="mb-4 rounded-xl border border-border-glass/70 bg-bg-sidebar/40 px-3 py-2 text-sm text-white">
        {selectedDay === null
          ? "Selecione um dia marcado para filtrar as movimentações daquele dia."
          : `Exibindo as movimentações do dia ${selectedDay}.`}
      </p>

      <div className="grid grid-cols-7 border-l border-t border-border-glass/70">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="border-b border-r border-border-glass/70 px-1 py-2 text-center text-xs font-medium text-text-secondary sm:px-2 sm:text-sm"
          >
            {weekDay}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const dayTransactions = day ? transactionsByDay.get(day) ?? [] : [];
          const isSelected = day === selectedDay;
          const hasIncome = dayTransactions.some(
            (transaction) => transaction.type === "income",
          );
          const hasExpense = dayTransactions.some(
            (transaction) => transaction.type === "expense",
          );

          return (
            <div
              key={`${day}-${index}`}
              className={`relative flex aspect-square min-h-11 items-start justify-end border-b border-r border-border-glass/70 text-sm text-white sm:min-h-16 sm:text-lg ${isSelected ? "bg-balance/15" : ""}`}
            >
              {day !== null && dayTransactions.length > 0 ? (
                <button
                  type="button"
                  className="absolute inset-0 flex items-start justify-end p-2 text-right outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-balance sm:p-3 cursor-pointer"
                  onClick={() => onDaySelect(day)}
                  aria-pressed={isSelected}
                  aria-label={`Filtrar movimentações do dia ${day}`}
                >
                  {day}
                  {(hasIncome || hasExpense) && (
                    <span className="absolute bottom-2 left-2 flex gap-1 sm:bottom-3 sm:left-3">
                      {hasIncome && <span className="h-2.5 w-2.5 rounded-full bg-income" />}
                      {hasExpense && <span className="h-2.5 w-2.5 rounded-full bg-expense" />}
                    </span>
                  )}
                </button>
              ) : (
                <span className="p-2 sm:p-3">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
