import { RouterProvider, createRouter } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { StrictMode } from "react";

import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { trpc } from "./utils/trpc";

const apiUrl = import.meta.env.PROD
  ? "https://cloud.drewh.net/api/trpc"
  : "http://localhost:3000/api/trpc";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl,
    }),
  ],
});

const queryClient = new QueryClient();

export const queryUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient,
});

const router = createRouter({
  routeTree,
  basepath: "/dashboard",
  trailingSlash: "never",
  context: {
    queryUtils,
  },
});

export type QueryUtilsType = typeof queryUtils;

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </trpc.Provider>
    </StrictMode>,
  );
}
