import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineDialog } from "@/components/custom/dialogs/RoutineDialog";
import { TaskDialog } from "@/components/custom/dialogs/TaskDialog";
import { IRoutine } from "./types/routine.types";
import { ITask } from "./types/task.types";
import { RoutineCard } from "@/components/custom/cards/routine-card/RoutineCard";
import { useApi } from "./context/ApiContext";

function App() {
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [selectedRoutine, setSelectedRoutine] = useState<number>();
  const [editingRoutine, setEditingRoutine] = useState<IRoutine>();
  const [editingTask, setEditingTask] = useState<ITask>();

  const { routines, deleteRoutine, updateTask, deleteTask } = useApi();

  const handleAddRoutine = () => {
    setIsRoutineModalOpen(true);
  };

  const handleAddTask = (routineId: number) => {
    setSelectedRoutine(routineId);
    setIsTaskModalOpen(true);
  };

  const handleEditRoutine = (routine: IRoutine) => {
    setEditingRoutine(routine);
    setIsRoutineModalOpen(true);
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setSelectedRoutine(task.routineId);
    setIsTaskModalOpen(true);
  };

  const handleCheckTask = (task: ITask) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDeleteRoutine = (routineId: number) => {
    deleteRoutine(routineId);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  return (
    <div className="flex flex-1 w-full h-full flex-col p-4 gap-4">
      <div className="flex  flex-row min-w-full ">
        <h1 className="text-3xl font-bold flex flex-1">Routines Manager</h1>
        <Button
          onClick={handleAddRoutine}
          className="flex flex-row items-center"
        >
          New Routine <Plus />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routines?.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onEdit={handleEditRoutine}
            onDelete={handleDeleteRoutine}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onCheckTask={handleCheckTask}
          />
        ))}
      </div>

      <RoutineDialog
        open={isRoutineModalOpen}
        onOpenChange={setIsRoutineModalOpen}
        routine={editingRoutine}
      />

      <TaskDialog
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        routineId={selectedRoutine}
        task={editingTask}
      />
    </div>
  );
}

export default App;
