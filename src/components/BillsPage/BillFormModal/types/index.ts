import type { Bill, BillInput } from "../../../../interfaces/bills";

export interface BillFormModalProps {
  isOpen: boolean;
  bill: Bill | null;
  onClose: () => void;
  onSubmit: (data: BillInput) => void;
}
