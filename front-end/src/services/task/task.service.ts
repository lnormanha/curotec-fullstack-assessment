// src/services/task.service.ts
import { ITask } from "@/types/task.types";
import { api } from "../api";
import { CreateTaskDto } from "./types";

export class TaskService {
  static prefix: string = "/tasks";

  static getAll = async () => {
    const { data } = await api.get<ITask[]>(this.prefix);
    return data;
  };

  static getById = async (id: number) => {
    const { data } = await api.get<ITask>(`${this.prefix}/${id}`);
    return data;
  };

  static create = async (task: Partial<CreateTaskDto>) => {
    const { data } = await api.post<ITask>(this.prefix, task);
    return data;
  };

  static update = async (id: number, data: Partial<ITask>) => {
    const response = await api.put<ITask>(`${this.prefix}/${id}`, data);
    return response.data;
  };

  static delete = async (id: number) => {
    await api.delete(`${this.prefix}/${id}`);
  };
}
