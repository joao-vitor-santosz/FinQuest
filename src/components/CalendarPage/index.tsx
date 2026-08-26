import { TransactionCalendar } from "../TransactionCalendar";
import { TransactionEventList } from "../TransactionEventList";
import { TransactionHistoryFilters } from "../TransactionHistoryFilters";

export const CalendarPage = () => (
  <div className="flex w-full flex-col gap-4 sm:gap-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Calendário
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Consulte suas movimentações por data.
        </p>
      </div>
      <TransactionHistoryFilters />
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6">
      <TransactionCalendar />
      <TransactionEventList />
    </div>
  </div>
);
