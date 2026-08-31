import { createFileRoute } from "@tanstack/react-router";
import { BillsPage } from "../../components/BillsPage";

export const Route = createFileRoute("/_app/bills")({
  component: () => <BillsPage />,
});
