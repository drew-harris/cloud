import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="h-full m-auto py-80">
      <Outlet />
    </div>
  ),
});
