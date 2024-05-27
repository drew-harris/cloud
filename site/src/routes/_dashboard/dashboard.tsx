import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { trpc } from "~/internal/trpc";

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
  const [projects] = trpc.projects.myProjects.useSuspenseQuery();

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold">Projects</div>
      {projects.length === 0 && (
        <div className="text-center opacity-50 pt-4">You have no projects.</div>
      )}
      <div className="pl-4">
        {projects.map((proj) => (
          <div className="truncate" key={proj.id}>
            - {proj.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="grid-cols-[300px,1fr] max-w-[100vw] grow grid">
        <div className="bg-bg-darker p-3">
          <Suspense>
            <Sidebar />
          </Suspense>
        </div>
        <div className="p-8 max-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
