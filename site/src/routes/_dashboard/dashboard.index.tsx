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
    <div className="flex gap-2">
      {projects.map((proj) => (
        <div key={proj.id}>{proj.name}</div>
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
