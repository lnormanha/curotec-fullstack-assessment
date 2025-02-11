import { ITask } from "./task.interface";

export interface IRoutine {
  id: number;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  tasks?: ITask[];
}
