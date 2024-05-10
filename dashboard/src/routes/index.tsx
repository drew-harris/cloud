import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/")({
  component: Index,
  pendingComponent: Loading,
  loader: ({ context }) => {
    context.queryUtils.testRoute.ensureData();
  },
});

function Loading() {
  return <div>Loading...</div>;
}

function Index() {
  const [test] = trpc.testRoute.useSuspenseQuery();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {test}
    </div>
  );
}
