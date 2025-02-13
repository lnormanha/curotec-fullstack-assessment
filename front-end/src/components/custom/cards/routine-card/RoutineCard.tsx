import React from "react";
import { EllipsisVertical, Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRoutine } from "@/types/routine.types";
import { TaskItem } from "@/components/custom/cards/routine-card/TaskItem";
import { ITask } from "@/types/task.types";

interface RoutineCardProps {
  routine: IRoutine;
  onEdit: (routine: IRoutine) => void;
  onDelete: (routineId: number) => void;
  onAddTask: (routineId: number) => void;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: number) => void;
  onCheckTask: (task: ITask) => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  onEdit,
  onDelete,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCheckTask,
}) => {
  return (
    <Card key={routine.id} className="flex flex-1 flex-col min-w-[400px]">
      <CardHeader className="flex flex-row justify-between items-center gap-2">
        <CardTitle>{routine.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col h-8 w-8 items-center justify-center p-2">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="items-center"
              onClick={() => onEdit(routine)}
            >
              <Pencil /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive items-center"
              onClick={() => onDelete(routine.id)}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <p className="text-gray-600">{routine.description}</p>
        {routine.tasks && routine.tasks.length > 0 ? (
          <div className="mt-4 space-y-2">
            {routine.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onCheck={onCheckTask}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">No tasks yet</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onAddTask(routine.id)}>
          <Plus /> Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};
