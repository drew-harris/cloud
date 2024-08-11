import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute("/_dashboard/dashboard/db/")({
  loader: async ({ context }) => {
    await context.trpc.databases.getAll.ensureData();
  },
  component: DatabaseList,
});

function DatabaseList() {
  const [dbs, { refetch }] = trpc.databases.getAll.useSuspenseQuery();

  const destroyMutation = trpc.databases.destroy.useMutation({
    onSuccess(data, variables, context) {
      refetch();
    },
  });

  return (
    <div>
      <div className="text-lg underline">Databases</div>
      <div className="py-2 pl-4">
        {dbs.map((db) => (
          <div className="flex gap-3" key={db.id}>
            <div>{db.name}</div>
            <div
              onClick={() => {
                destroyMutation.mutate({
                  id: db.id,
                });
              }}
            >
              DELETE
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
