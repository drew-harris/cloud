import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="justify-items-center items-center m-auto pt-40 px-8 md:px-0 md:pt-80">
      <Outlet />
    </div>
  ),
});
