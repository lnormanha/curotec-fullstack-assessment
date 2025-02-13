import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineDialog } from "@/components/custom/dialogs/RoutineDialog";
import { TaskDialog } from "@/components/custom/dialogs/TaskDialog";
import { IRoutine } from "./types/routine.types";
import { ITask } from "./types/task.types";
import { RoutineCard } from "@/components/custom/cards/routine-card/RoutineCard";
import { useApi } from "./context/ApiContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";

function App() {
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<number>();
  const [editingRoutine, setEditingRoutine] = useState<IRoutine>();
  const [editingTask, setEditingTask] = useState<ITask>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { routines, deleteRoutine, updateTask, deleteTask, fetchRoutines } =
    useApi();

  useEffect(() => {
    fetchRoutines(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div className="flex flex-1 min-w-full w-full h-full flex-col p-4 gap-4 overflow-hidden">
      <div className="flex flex-row min-w-full">
        <h1 className="text-3xl font-bold flex flex-1">Routines Manager</h1>
        <Button
          onClick={handleAddRoutine}
          className="flex flex-row items-center"
        >
          New Routine <Plus />
        </Button>
      </div>

      {routines?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-lg text-muted-foreground">No routines found</p>
          <Button
            onClick={handleAddRoutine}
            className="mt-4 flex flex-row items-center"
          >
            Add Routine <Plus />
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 w-full">
          <Carousel
            className="flex flex-1 justify-center max-w-full px-12"
            opts={{ align: "start", slidesToScroll: 2 }}
          >
            <CarouselContent className="flex flex-1 h-full w-full ">
              {routines?.map((routine) => (
                <CarouselItem
                  key={routine.id}
                  className={`flex md:basis-1/2 lg:basis-1/${routines.length >= 3 ? 3 : 1} h-full`}
                >
                  <RoutineCard
                    routine={routine}
                    onEdit={handleEditRoutine}
                    onDelete={handleDeleteRoutine}
                    onAddTask={handleAddTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                    onCheckTask={handleCheckTask}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-1/2 left-2 flex items-center justify-center">
              <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
            </div>
            <div className="absolute top-1/2 right-2 flex items-center justify-center">
              <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
            </div>
          </Carousel>
        </div>
      )}

      <div className="py-2 text-center text-sm text-muted-foreground">
        Showing {routines?.length} Routine{routines?.length === 1 ? "" : "s"}{" "}
        from Page {page}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem onClick={() => handlePageChange(page - 1)}>
              <PaginationPrevious />
            </PaginationItem>

            {page - 1 > 0 && (
              <PaginationItem onClick={() => handlePageChange(page - 1)}>
                <PaginationLink>{page - 1}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem onClick={() => handlePageChange(page)}>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => handlePageChange(page + 1)}>
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => handlePageChange(page + 1)}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
