import { Link, createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { trpc } from "~/internal/trpc";

export const Route = createFileRoute("/database")({
  component: DatabasePage,
});

function DatabasePage() {
  const [nameText, setEmailText] = useState("");
  const [databaseUrl, setDatabaseUrl] = useState("");
  const submitMutation = trpc.databases.create.useMutation({
    onError(error, variables, context) {
      console.error(error);
      alert("there was an error setting up your database");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({ name: nameText });
  };

  return (
    <div className="p-[16px] mx-auto flex justify-center mt-28">
      <fieldset className="border-2 border-black flex items-center px-20 flex-col halftone-shadow p-[16px] bg-white">
        <legend className="font-bold font-mono text-lg px-2">
          Create A PostgreSQL Database
        </legend>

        {submitMutation.status === "idle" && (
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="name" className="block">
              Database Name
            </label>
            <input
              value={nameText}
              onChange={(e) => setEmailText(e.target.value)}
              id="name"
              name="name"
              className="block px-2 py-1 border-2 border-black"
              type="text"
            />
            <div className="h-8"></div>
            <button
              type="submit"
              className="block border-2 text-white bg-black border-black p-2 mx-auto"
            >
              Submit
            </button>
          </form>
        )}

        {submitMutation.status === "pending" && (
          <div>Creating database....</div>
        )}

        {submitMutation.status === "error" && (
          <div>{submitMutation.error.message}</div>
        )}

        {submitMutation.status === "success" && (
          <div>{submitMutation.data.databaseUrl}</div>
        )}
      </fieldset>
    </div>
  );
}
