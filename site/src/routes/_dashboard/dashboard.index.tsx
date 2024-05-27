import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const testJobMutation = trpc.testJob.useMutation();

  return (
    <div className="">
      <div>Hello</div>
      <button
        onClick={() => {
          testJobMutation.mutate();
        }}
        className="bg-gray-500 font-bold p-2 text-white"
      >
        Test Job
      </button>
    </div>
  );
}
