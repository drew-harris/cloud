import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="justify-items-center md:h-screen flex items-center m-auto pt-40 md:pt-0 px-8 md:px-0">
      <Outlet />
    </div>
  ),
});
