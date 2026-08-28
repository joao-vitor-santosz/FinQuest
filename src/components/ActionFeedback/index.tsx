import { useEffect, useEffectEvent } from "react";
import type { ActionFeedbackProps } from "./types";

export const ActionFeedback = ({
  message,
  onDismiss,
}: ActionFeedbackProps) => {
  const dismissFeedback = useEffectEvent(onDismiss);

  useEffect(() => {
    if (message === null) {
      return;
    }

    const timeout = window.setTimeout(dismissFeedback, 4000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  if (message === null) {
    return null;
  }

  return (
    <div
      key={message}
      className="animate-delete-feedback fixed bottom-20 right-4 z-1001 rounded-xl border border-income/30 bg-bg-card px-4 py-3 text-sm font-medium text-white shadow-2xl sm:bottom-6 sm:right-6"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
