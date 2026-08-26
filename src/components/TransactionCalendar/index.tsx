import { ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const TransactionCalendar = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(currentDate);
  const calendarDays = Array.from(
    { length: firstWeekDay + daysInMonth },
    (_, index) => (index < firstWeekDay ? null : index - firstWeekDay + 1),
  );

  return (
    <section className="rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="capitalize text-2xl font-semibold text-white sm:text-3xl">
          {monthLabel}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="rounded-xl border border-border-glass p-2 text-text-secondary opacity-50"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            disabled
            className="rounded-xl border border-border-glass p-2 text-text-secondary opacity-50"
            aria-label="Próximo mês"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-l border-t border-border-glass/70">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="border-b border-r border-border-glass/70 px-1 py-2 text-center text-xs font-medium text-text-secondary sm:px-2 sm:text-sm"
          >
            {weekDay}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="flex aspect-square min-h-11 items-start justify-end border-b border-r border-border-glass/70 p-2 text-sm text-white sm:min-h-16 sm:p-3 sm:text-lg"
          >
            {day}
          </div>
        ))}
      </div>
    </section>
  );
};
