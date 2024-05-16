import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/")({
  component: Index,
  wrapInSuspense: true,
  loader: async ({ context }) => {
    await context.queryUtils.testRoute.ensureData();
  },
});

function Index() {
  const [test] = trpc.testRoute.useSuspenseQuery();
  return (
    <div className="p-14">
      <form className="halftone-shadow max-w-[200px] space-y-6 halftone-offset">
        <fieldset className="px-4 pb-4 bg-white border-black border">
          <legend className="p-2 font-bold font-mono text-sm">Legend</legend>
          <div className="py-4 font-mono">{test}</div>
        </fieldset>
      </form>
    </div>
  );
}
