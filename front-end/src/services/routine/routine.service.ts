import { api } from "../api";
import { IRoutine } from "@/types/routine.types";
import { CreateRoutineDto } from "./types";
import { toast } from "sonner";

export class RoutineService {
  static prefix = "/routines";

  static async getAll(page: number, limit: number) {
    try {
      const { data } = await api.get<IRoutine[]>(this.prefix, {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      toast.error("Failed to fetch routines");
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const { data } = await api.get<IRoutine>(`${this.prefix}/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to fetch routine");
      throw error;
    }
  }

  static async create(routine: CreateRoutineDto) {
    try {
      const { data } = await api.post<IRoutine>(this.prefix, routine);
      return data;
    } catch (error) {
      toast.error("Failed to create routine");
      throw error;
    }
  }

  static async update(id: number, routine: Partial<IRoutine>) {
    try {
      const { data } = await api.put<IRoutine>(`${this.prefix}/${id}`, routine);
      return data;
    } catch (error) {
      toast.error("Failed to update routine");
      throw error;
    }
  }

  static async delete(id: number) {
    try {
      await api.delete(`${this.prefix}/${id}`);
    } catch (error) {
      toast.error("Failed to delete routine");
      throw error;
    }
  }
}
