import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DitherBox } from "~/components/DitherBox";

export const Route = createFileRoute("/_auth/login")({
  component: () => {
    const [codeInput, setCodeInput] = useState("");

    return (
      <DitherBox
        className="flex max-w-sm p-2 mx-auto"
        title="Log In With Beta Code"
      >
        <a
          href="/auth/login"
          className="mx-auto max-w-[200px] text-center halftone-d-4 bg-black text-white border-black p-2 halftone-offset block halftone-shadow"
        >
          Log In With Github
        </a>
        <a
          href="/auth/login"
          className="mx-auto max-w-[200px] text-center halftone-d-4 bg-black text-white border-black p-2 halftone-offset block halftone-shadow"
        >
          Log In With Github
        </a>
      </DitherBox>
    );
  },
});
