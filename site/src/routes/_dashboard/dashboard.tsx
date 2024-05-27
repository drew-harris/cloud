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

function Navbar() {
  return (
    <div className="min-h-11 px-4 text-xs flex border-b-2 border-black items-center bg-brand-orange">
      DHCE
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold">Projects</div>
      <div className="text-center opacity-50">You have no projects.</div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="grid-cols-[300px,1fr] grow grid">
        <div className="bg-bg-darker p-3">
          <Sidebar />
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
