import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IRoutine } from "@/types/routine.types";
import { useApi } from "@/context/ApiContext";
import { CreateRoutineDto, UpdateRoutineDto } from "@/types/routine.types";
import { toast } from "sonner";

const routineFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type RoutineFormValues = z.infer<typeof routineFormSchema>;

interface CreateRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routine?: IRoutine;
}

export function RoutineDialog({
  open,
  onOpenChange,
  routine,
}: CreateRoutineDialogProps) {
  const { refetchRoutines, createRoutine, updateRoutine } = useApi();
  const form = useForm<RoutineFormValues>({
    resolver: zodResolver(routineFormSchema),
    values: {
      title: routine?.title || "",
      description: routine?.description || "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      if (routine) {
        const updateData: UpdateRoutineDto = {
          id: routine.id,
          ...data,
        };
        await updateRoutine(updateData);
        toast.success("Routine updated successfully");
      } else {
        const createData: CreateRoutineDto = {
          ...data,
        };
        await createRoutine(createData);
        toast.success("Routine created successfully");
      }
      refetchRoutines();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to save routine");
      console.error("Failed to save routine:", error);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {routine ? "Edit Routine" : "Create New Routine"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter routine title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter routine description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleOnSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
