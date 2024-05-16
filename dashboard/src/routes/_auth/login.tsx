import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: () => {
    return (
      <a
        href="http://localhost:3000/api/auth/login"
        className="mx-auto halftone-d-4 bg-black text-white border-black p-2 halftone-offset block halftone-shadow"
      >
        Log In With Github
      </a>
    );
  },
});
