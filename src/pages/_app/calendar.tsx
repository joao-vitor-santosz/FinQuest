import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "../../components/CalendarPage";

export const Route = createFileRoute("/_app/calendar")({
  component: () => <CalendarPage />,
});
