import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { cn } from "~/frontendUtils";
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
    <div className="flex w-full bg-brand-orange justify-between border-b-2 border-black">
      <Link
        // @ts-ignore //TODO: Fix
        to="/dashboard"
        className="min-h-11 px-4 text-xs flex items-center "
      >
        DHCE
      </Link>
      <Link
        to="/dashboard/db"
        className="min-h-11 px-4 text-xs flex items-center "
      >
        Database Admin
      </Link>
    </div>
  );
}

function Sidebar() {
  const [projects] = trpc.projects.myProjects.useSuspenseQuery();
  const { location } = useRouterState();
  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold">Projects</div>
      {projects.length === 0 && (
        <div className="text-center opacity-50 pt-4">You have no projects.</div>
      )}
      <div className="pl-4">
        {projects.map((proj) => (
          <Link
            to={`/dashboard/projects/${proj.id}`}
            className={cn(
              "truncate block",
              location.pathname === `/dashboard/projects/${proj.id}` &&
                "underline",
            )}
            key={proj.id}
          >
            - {proj.name}
          </Link>
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
