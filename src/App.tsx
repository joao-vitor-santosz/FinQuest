import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./router-tree-gen";
import { TransactionProvider } from "./context/TransactionContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <TransactionProvider>
      <RouterProvider router={router} />;
    </TransactionProvider>
  );
}
