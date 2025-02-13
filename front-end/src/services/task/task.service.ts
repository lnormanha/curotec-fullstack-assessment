import { api } from "../api";
import { ITask } from "@/types/task.types";
import { CreateTaskDto } from "./types";
import { toast } from "sonner";

export class TaskService {
  static prefix = "/tasks";

  static async getAll(routineId: number) {
    try {
      const { data } = await api.get<ITask[]>(this.prefix, {
        params: { routineId },
      });
      return data;
    } catch (error) {
      toast.error("Failed to fetch tasks");
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const { data } = await api.get<ITask>(`${this.prefix}/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to fetch task");
      throw error;
    }
  }

  static async create(task: CreateTaskDto) {
    try {
      const { data } = await api.post<ITask>(this.prefix, task);
      return data;
    } catch (error) {
      toast.error("Failed to create task");
      throw error;
    }
  }

  static async update(id: number, task: Partial<ITask>) {
    try {
      const { data } = await api.put<ITask>(`${this.prefix}/${id}`, task);
      return data;
    } catch (error) {
      toast.error("Failed to update task");
      throw error;
    }
  }

  static async delete(id: number) {
    try {
      await api.delete(`${this.prefix}/${id}`);
    } catch (error) {
      toast.error("Failed to delete task");
      throw error;
    }
  }
}
