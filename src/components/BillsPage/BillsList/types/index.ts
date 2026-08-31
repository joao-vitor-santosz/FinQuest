import type { Bill } from "../../../../interfaces/bills";

export interface BillsListProps {
  bills: Bill[];
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
}
