import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export const CreateProjectModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button>Create Project</button>
      </DialogTrigger>
      <DialogContent>
        <div>Create Project Here</div>
      </DialogContent>
    </Dialog>
  );
};
