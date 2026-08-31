import type { Bill } from "../../../../interfaces/bills";

export interface BillDetailsProps {
  bill: Bill | null;
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
}
