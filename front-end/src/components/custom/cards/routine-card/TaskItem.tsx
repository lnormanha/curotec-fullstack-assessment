import React from "react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ITask } from "@/types/task.types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TaskItemProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: number) => void;
  onCheck: (task: ITask) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onCheck,
}) => {
  return (
    <div
      key={task.id}
      className="flex items-center justify-between px-2 bg-gray-200 rounded"
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onClick={() => onCheck(task)}
      />
      <Label htmlFor={`task-${task.id}`}>{task.title}</Label>
      <span className="text-sm text-gray-500">
        {new Date(task.startTime).toLocaleTimeString()}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-col h-8 w-8 items-center justify-center p-2">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="items-center"
            onClick={() => onEdit(task)}
          >
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive items-center"
            onClick={() => onDelete(task.id)}
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
