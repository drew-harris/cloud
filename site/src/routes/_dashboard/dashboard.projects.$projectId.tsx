import { createFileRoute } from "@tanstack/react-router";
import { CreateServiceModal } from "~/components/services/CreateServiceModal";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute(
  "/_dashboard/dashboard/projects/$projectId",
)({
  component: ProjectPage,
  loader: async ({ context, params }) => {
    await context.trpc.services.servicesForProject.ensureData({
      id: params.projectId,
    });
    return;
  },
});

function ProjectPage() {
  const params = Route.useParams();
  const [services] = trpc.services.servicesForProject.useSuspenseQuery({
    id: params.projectId,
  });
  return (
    <div>
      <div>Services</div>
      {services.map((s) => (
        <div key={s.id}>{s.id}</div>
      ))}
      <CreateServiceModal projectId={params.projectId} />
    </div>
  );
}
