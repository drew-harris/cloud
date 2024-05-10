import type { AppRouter } from "drewh-cloud-server/trpc";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>({});
