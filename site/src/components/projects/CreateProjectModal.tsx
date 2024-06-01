import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { trpc } from "~/internal/trpc";

export const CreateProjectModal = () => {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const createProjectMutation = trpc.projects.createProject.useMutation({
    onMutate(variables) {
      utils.projects.myProjects.setData(undefined, (data) => {
        return [
          {
            createdAt: new Date().toTimeString(),
            id: "josiejflijl",
            name: variables.name,
            userId: "uhf83",
          },
          ...(data ?? []),
        ];
      });
    },
    onSettled() {
      utils.projects.myProjects.invalidate();
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (!createProjectMutation.isPending) {
      createProjectMutation.mutate({
        name,
      });
    }
    setName("");

    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="bg-white/40 min-h-24 min-w-56 p-2 text-sm flex items-center gap-3 justify-center border-2 border-gray-500">
        Create Project
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create A Project</DialogTitle>
        <form onSubmit={submit} className="flex flex-col gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name.."
            aria-label="Project Name"
          />
          <Button type="submit" className="self-end">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
