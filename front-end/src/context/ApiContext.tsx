import { createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoutineService } from "../services/routine/routine.service";
import { TaskService } from "../services/task/task.service";
import { IRoutine } from "../types/routine.types";
import { CreateRoutineDto, UpdateRoutineDto } from "../types/routine.types";
import { CreateTaskDto, UpdateTaskDto } from "../services/task/types";

interface ApiContextType {
  routines: IRoutine[];
  refetchRoutines: () => void;
  createRoutine: (data: CreateRoutineDto) => void;
  updateRoutine: (data: UpdateRoutineDto) => void;
  deleteRoutine: (id: number) => void;
  createTask: (data: CreateTaskDto) => void;
  updateTask: (data: UpdateTaskDto) => void;
  deleteTask: (id: number) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: routines = [], refetch: refetchRoutines } = useQuery({
    queryKey: ["routines"],
    queryFn: () => RoutineService.getAll(),
  });

  const deleteRoutineMutation = useMutation({
    mutationFn: (id: number) => RoutineService.delete(id),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: UpdateTaskDto) => TaskService.update(data.id, data),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const createRoutineMutation = useMutation({
    mutationFn: (data: CreateRoutineDto) => RoutineService.create(data),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const updateRoutineMutation = useMutation({
    mutationFn: (data: UpdateRoutineDto) =>
      RoutineService.update(data.id, data),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskDto) =>
      TaskService.create({
        ...data,
        startTime: new Date(data.startTime).toISOString(),
      }),
    onSuccess: () => {
      refetchRoutines();
    },
  });

  const deleteRoutine = (id: number) => {
    deleteRoutineMutation.mutate(id);
  };

  const updateTask = (data: UpdateTaskDto) => {
    updateTaskMutation.mutate(data);
  };

  const deleteTask = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  const createRoutine = (data: CreateRoutineDto) => {
    createRoutineMutation.mutate(data);
  };

  const updateRoutine = (data: UpdateRoutineDto) => {
    updateRoutineMutation.mutate(data);
  };

  const createTask = (data: CreateTaskDto) => {
    createTaskMutation.mutate(data);
  };

  return (
    <ApiContext.Provider
      value={{
        routines,
        refetchRoutines,
        deleteRoutine,
        updateTask,
        deleteTask,
        createRoutine,
        updateRoutine,
        createTask,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
