import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ServiceType } from "shared/types";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { trpc } from "~/internal/trpc";

interface CreateServiceModalProps {
  projectId: string;
}

export const CreateServiceModal = ({ projectId }: CreateServiceModalProps) => {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);

  const createServiceMutation = trpc.services.createService.useMutation({
    onMutate(variables) {
      utils.services.servicesForProject.setData(
        { id: variables.projectId },
        (data) => {
          return [
            {
              createdAt: new Date().toTimeString(),
              type: variables.type,
              projectId: variables.projectId,
              id: "josiejflijl",
            },
            ...(data ?? []),
          ];
        },
      );
    },
    onSettled() {
      utils.services.servicesForProject.invalidate({ id: projectId });
    },
  });

  const submit = (type: ServiceType) => {
    if (!createServiceMutation.isPending) {
      createServiceMutation.mutate({
        projectId,
        type,
      });
    }

    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className="bg-white/40 min-h-24 min-w-56 p-2 text-sm flex items-center gap-3 justify-center border-2 border-gray-500">
        Create Project
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create A Service</DialogTitle>
        <div className="grid gap-3 grid-cols-3">
          <ServiceGridButton
            label="Isolate"
            onClick={() => void submit("isolate")}
            serviceType="isolate"
          ></ServiceGridButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ServiceGridButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  serviceType: ServiceType;
  label: string;
}

const ServiceGridButton = ({
  serviceType,
  label,
  ...props
}: ServiceGridButtonProps) => {
  return (
    <button
      className="border hover:bg-gray-50 min-h-3.5 border-black"
      {...props}
    >
      {label}
    </button>
  );
};
