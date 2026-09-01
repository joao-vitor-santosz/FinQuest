import type { Bill } from "../../../../interfaces/bills";

export interface BillDetailsProps {
  bill: Bill | null;
  onPay: (bill: Bill) => void;
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
}
