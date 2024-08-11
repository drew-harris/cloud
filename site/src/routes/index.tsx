import { Link, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  // beforeLoad(opts) {
  //   if (opts.context.user?.id) {
  //     throw redirect({
  //       //@ts-ignore
  //       to: "/dashboard",
  //     });
  //   }
  // },
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <div className="fixed text-black p-1 px-2 top-8 right-8">
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>

      <div className="p-[16px] md:max-w-[700px] m-auto mt-28">
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

          <div className="flex py-4 mt-4 gap-8 w-full justify-evenly mx-auto">
            <Link className="underline" to="/waitlist">
              Join the waitlist
            </Link>
            <Link className="underline" to="/database">
              Get a database
            </Link>
          </div>
        </fieldset>
      </div>
    </>
  );
}
