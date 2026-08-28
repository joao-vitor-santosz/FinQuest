import { createFileRoute } from "@tanstack/react-router";
import { FilesPage } from "../../components/FilesPage";

type FilesSearch = {
  tab?: "receipts" | "transactions" | "exports";
};

export const Route = createFileRoute("/_app/files")({
  validateSearch: (search: Record<string, unknown>): FilesSearch => ({
    tab:
      search.tab === "receipts" ||
      search.tab === "transactions" ||
      search.tab === "exports"
        ? search.tab
        : undefined,
  }),
  component: () => <FilesPage />,
});
