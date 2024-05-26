import { QueryClient, hydrate } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "~/internal/router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { trpc } from "~/internal/trpc";
import { type User } from "lucia";

let dehydrationUser: User | null = null;

void render();

async function render() {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: import.meta.env.PROD
          ? "https://drewh.cloud/trpc"
          : "http://localhost:3000/trpc",
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
        user: null,
        isServer: false,
      },
      hydrate: (dehydrated: any) => {
        console.log(dehydrated);
        hydrate(queryClient, dehydrated["queryClient"]);
        dehydrationUser = dehydrated["user"];
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

  // Get the current context
  const context = {
    trpc: queryUtils,
    user: dehydrationUser,
    isServer: false,
  };

  router.update({
    context,
  });

  hydrateRoot(document, <RouterProvider router={router} />);
}
