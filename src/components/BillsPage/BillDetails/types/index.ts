import type {
  Bill,
  BillRecurrenceStatus,
} from "../../../../interfaces/bills";

export interface BillDetailsProps {
  bill: Bill | null;
  onPay: (bill: Bill) => void;
  onSetRecurrenceStatus: (bill: Bill, status: BillRecurrenceStatus) => void;
  onEndRecurrence: (bill: Bill) => void;
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
}
