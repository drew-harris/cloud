import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login/error")({
  component: () => (
    <div className="flex flex-col max-w-[400px] bg-white mx-auto p-8 border-black border-2 items-center gap-3 font-bold">
      <div className="font-mono text-red-500 text-center mx-auto">
        There was an error logging in.
      </div>
      <Link className="mx-auto" to="/login">
        Try Again
      </Link>
    </div>
  ),
});

