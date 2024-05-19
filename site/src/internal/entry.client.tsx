import { QueryClient, hydrate } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "~/internal/router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { trpc } from "~/internal/trpc";

void render();

const apiUrl = import.meta.env.PROD
  ? "https://cloud.drewh.net/api/trpc"
  : "http://localhost:3000/api/trpc";

async function render() {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: apiUrl,
      }),
    ],
  });
  const queryUtils = createTRPCQueryUtils({
    queryClient,
    client: trpcClient,
  });
  const router = createRouter(
    {
      context: {
        trpc: queryUtils,
      },
      hydrate: (dehydrated: any) => {
        hydrate(queryClient, dehydrated["queryClient"]);
      },
    },
    queryClient,
    trpcClient,
  );

  // THIS DOES NOT WORK IF YOU WANT TO HYDRATE FROM TRPC!
  // if (!router.state.matches.length) {
  //   // do NOT need if not using lazy file routes
  //   await router.load(); // needed until https://github.com/TanStack/router/issues/1115 is resolved
  // }

  router.hydrate();
  hydrateRoot(document, <RouterProvider router={router} />);
}
