import type { Bill } from "../../../interfaces/bills";
import { getEffectiveBillStatus, getLocalIsoDate } from "../../../utils/bill-status";
import type { BillsFilters } from "../types";

const isWithinPeriod = (bill: Bill, period: BillsFilters["period"]) => {
  if (period === "all") {
    return true;
  }

  const today = new Date();
  const todayAsIsoDate = getLocalIsoDate(today);

  if (period === "today") {
    return bill.dueDate === todayAsIsoDate;
  }

  if (period === "7d") {
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekAsIsoDate = getLocalIsoDate(nextWeek);

    return bill.dueDate >= todayAsIsoDate && bill.dueDate <= nextWeekAsIsoDate;
  }

  return (
    bill.dueDate.slice(0, 7) ===
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  );
};

export const filterBills = (bills: Bill[], filters: BillsFilters) => {
  const normalizedSearchTerm = filters.searchTerm.trim().toLocaleLowerCase("pt-BR");

  return bills
    .filter(
      (bill) =>
        filters.status === "all" ||
        getEffectiveBillStatus(bill) === filters.status,
    )
    .filter((bill) => filters.type === "all" || bill.type === filters.type)
    .filter(
      (bill) => filters.category === "all" || bill.category === filters.category,
    )
    .filter((bill) => isWithinPeriod(bill, filters.period))
    .filter(
      (bill) =>
        normalizedSearchTerm.length === 0 ||
        bill.description
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearchTerm) ||
        bill.category
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearchTerm),
    )
    .sort(
      (firstBill, secondBill) =>
        firstBill.dueDate.localeCompare(secondBill.dueDate) ||
        firstBill.description.localeCompare(secondBill.description, "pt-BR"),
    );
};

export const getBillCategories = (bills: Bill[]) =>
  [...new Set(bills.map((bill) => bill.category))].sort((first, second) =>
    first.localeCompare(second, "pt-BR"),
  );
