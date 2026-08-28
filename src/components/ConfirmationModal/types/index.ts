import type { ReactNode } from "react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  confirmVariant?: "danger" | "primary";
  children?: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}
