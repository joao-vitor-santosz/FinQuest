import type { ArchiveDetailsProps } from "../types";

export const ArchiveDetails = ({
  children,
  ref,
}: ArchiveDetailsProps) => (
  <aside
    ref={ref}
    className="animate-page-content-enter min-w-0 rounded-2xl border border-border-glass bg-bg-card/40 p-4 backdrop-blur-md sm:p-6"
    style={{ animationDelay: "260ms" }}
  >
    {children}
  </aside>
);
