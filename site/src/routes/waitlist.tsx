import { Link, createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
});

function WaitlistPage() {
  const [emailText, setEmailText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const submitMutation = trpc.waitlist.join.useMutation({
    onSuccess: () => {
      setHasSubmitted(true);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({ email: emailText });
  };

  return (
    <div className="p-[16px] mx-auto flex justify-center mt-28">
      <fieldset className="border-2 border-black flex px-20 flex-col halftone-shadow p-[16px] bg-white">
        <legend className="font-bold font-mono text-lg px-2">
          Join The Waitlist
        </legend>

        {!hasSubmitted ? (
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              id="email"
              name="email"
              className="block px-2 py-1 border-2 border-black"
              type="email"
            />
            <div className="h-8"></div>
            <button
              type="submit"
              className="block border-2 text-white bg-black border-black p-2 mx-auto"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            Thank You!
            <Link className="underline block" to="/">
              Back
            </Link>
          </div>
        )}
      </fieldset>
    </div>
  );
}

