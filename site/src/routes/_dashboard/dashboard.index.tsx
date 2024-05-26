import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: () => (
    <div className="">
      <div>Hello</div>
    </div>
  ),
});
