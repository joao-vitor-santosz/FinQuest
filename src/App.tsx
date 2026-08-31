import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./router-tree-gen";
import { TransactionProvider } from "./context/TransactionContext";
import { ArchiveProvider } from "./context/ArchiveProvider";
import { BillsProvider } from "./context/BillsProvider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <TransactionProvider>
      <ArchiveProvider>
        <BillsProvider>
          <RouterProvider router={router} />
        </BillsProvider>
      </ArchiveProvider>
    </TransactionProvider>
  );
}
