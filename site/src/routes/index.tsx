import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <div className="fixed bg-gray-500 text-white p-1 px-2 top-8 right-8">
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>

      <div className="p-[16px] md:max-w-[50%] m-auto mt-28">
        <fieldset className="border-2 px-8 border-black flex flex-col halftone-shadow p-[16px] bg-white">
          <legend className="font-bold font-mono text-lg px-2">
            Drewh Cloud Enterprises
          </legend>

          <div className="">
            <div className="">We Do:</div>
            <li>Databases</li>
            <li>Container Deployment</li>
            <li>Static Site Hosting</li>
            <li>Cloud Functions</li>
            <li>Other Stuff</li>
          </div>

          <div className="opacity-65 mt-4 mx-auto">
            For more info and to join the beta, email{" "}
            <a className="underline" href="mailto:harrisd@smu.edu">
              harrisd@smu.edu
            </a>
          </div>
        </fieldset>
      </div>
    </>
  );
}
