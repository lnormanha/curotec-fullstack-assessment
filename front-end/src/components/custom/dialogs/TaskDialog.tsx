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
import { ITask } from "@/types/task.types";
import { useApi } from "@/context/ApiContext";
import { CreateTaskDto, UpdateTaskDto } from "@/services/task/types";
import { toast } from "sonner";

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startTime: z.string().min(1, "Start time is required"),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routineId?: number;
  task?: ITask;
}

export function TaskDialog({
  open,
  onOpenChange,
  routineId,
  task,
}: TaskDialogProps) {
  const { refetchRoutines, createTask, updateTask } = useApi();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    values: {
      title: task?.title || "",
      startTime: task?.startTime || "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      if (task) {
        const updateData: UpdateTaskDto = {
          id: task.id,
          ...data,
        };
        await updateTask(updateData);
        toast.success("Task updated successfully");
      } else {
        const createData: CreateTaskDto = {
          ...data,
          routineId: routineId!,
        };
        await createTask(createData);
        toast.success("Task created successfully");
      }
      refetchRoutines();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to save task");
      console.error("Failed to create/update task:", error);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"} </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter task title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
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
