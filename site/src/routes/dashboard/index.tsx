import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  loader: async ({ context }) => {
    const user = await context.trpc.whoAmI.fetch();
    return { user };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const user = Route.useLoaderData();
  return <div>YOU ARE: {JSON.stringify(user.user)}</div>;
}
