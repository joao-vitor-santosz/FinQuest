import { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionCalendar } from "../TransactionCalendar";
import { TransactionEventList } from "../TransactionEventList";
import {
  TransactionHistoryFilters,
  type CalendarTransactionFilter,
} from "../TransactionHistoryFilters";

export const CalendarPage = () => {
  const today = new Date();
  const [displayedDate, setDisplayedDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [transactionFilter, setTransactionFilter] =
    useState<CalendarTransactionFilter>("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { transactions } = useContext(TransactionContext);
  const monthTransactions = transactions.filter((transaction) => {
    const [year, month] = transaction.date.split("-").map(Number);

    return (
      year === displayedDate.getFullYear() &&
      month === displayedDate.getMonth() + 1
    );
  });
  const filteredMonthTransactions = monthTransactions.filter(
    (transaction) =>
      transactionFilter === "all" || transaction.type === transactionFilter,
  );
  const visibleTransactions = filteredMonthTransactions.filter(
    (transaction) =>
      selectedDay === null || Number(transaction.date.split("-")[2]) === selectedDay,
  );

  const handleDisplayedDateChange = (date: Date) => {
    setDisplayedDate(date);
    setSelectedDay(null);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay((currentDay) => (currentDay === day ? null : day));
  };

  return (
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
        <TransactionHistoryFilters
          value={transactionFilter}
          onChange={setTransactionFilter}
          selectedDay={selectedDay}
          onClearSelectedDay={() => setSelectedDay(null)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-6">
        <TransactionCalendar
          displayedDate={displayedDate}
          onDisplayedDateChange={handleDisplayedDateChange}
          transactions={filteredMonthTransactions}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
        />
        <TransactionEventList transactions={visibleTransactions} />
      </div>
    </div>
  );
};
