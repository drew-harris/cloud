import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const utils = trpc.useUtils();
  const doPreload = () => {
    utils.testRoute.prefetch();
  };
  return (
    <div>
      <div>About page</div>
      <button onClick={doPreload}>Preload special</button>
    </div>
  );
}
