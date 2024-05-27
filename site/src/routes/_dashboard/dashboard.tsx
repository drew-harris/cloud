import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="p-8">
      <Outlet />
    </div>
  );
}
