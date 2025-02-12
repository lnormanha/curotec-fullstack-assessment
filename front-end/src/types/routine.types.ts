import { ITask } from "./task.types";

export interface IRoutine {
  id: number;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  tasks?: ITask[];
}

export interface CreateRoutineDto {
  title: string;
  description?: string;
}

export interface UpdateRoutineDto {
  id: number;
  title?: string;
  description?: string;
}
