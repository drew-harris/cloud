import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: () => {
    return (
      <a
        href="/auth/login"
        className="mx-auto max-w-[200px] text-center halftone-d-4 bg-black text-white border-black p-2 halftone-offset block halftone-shadow"
      >
        Log In With Github
      </a>
    );
  },
});
