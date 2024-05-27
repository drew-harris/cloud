import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { CreateProjectModal } from "~/components/projects/CreateProjectModal";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  loader: async ({ context }) => {
    await context.trpc.projects.myProjects.ensureData();
  },
  component: DashboardPage,
});

function ProjectsBar() {
  const [projects] = trpc.projects.myProjects.useSuspenseQuery();

  return (
    <div className="flex gap-4 max-w-full flex-wrap ">
      {projects?.map((proj) => (
        <div
          className="bg-white halftone-shadow max-w-56 halftone-d-4 min-h-24 min-w-56 p-4 font-bold flex flex-col border-2 border-black"
          key={proj.id}
        >
          <div className="text-wrap truncate">{proj.name}</div>
        </div>
      ))}
      <CreateProjectModal />
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="">
      <div>Projects</div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsBar />
      </Suspense>
    </div>
  );
}
