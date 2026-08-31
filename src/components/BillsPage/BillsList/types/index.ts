import type { Bill } from "../../../../interfaces/bills";

export interface BillsListProps {
  bills: Bill[];
  selectedBillId: string | null;
  hasActiveFilters: boolean;
  onSelect: (billId: string) => void;
}
