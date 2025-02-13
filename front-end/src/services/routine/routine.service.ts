// src/services/routine.service.ts
import { IRoutine } from "@/types/routine.types";
import { api } from "../api";
import { CreateRoutineDto } from "./types";

export class RoutineService {
  static prefix = "/routines";

  static async getAll(page: number, limit: number) {
    const { data } = await api.get<IRoutine[]>(this.prefix, {
      params: { page, limit },
    });
    return data;
  }

  static async getById(id: number) {
    const { data } = await api.get<IRoutine>(`${this.prefix}/${id}`);
    return data;
  }

  static async create(routine: CreateRoutineDto) {
    const { data } = await api.post<IRoutine>(this.prefix, routine);
    return data;
  }

  static async update(id: number, routine: Partial<IRoutine>) {
    const { data } = await api.put<IRoutine>(`${this.prefix}/${id}`, routine);
    return data;
  }

  static async delete(id: number) {
    await api.delete(`${this.prefix}/${id}`);
  }
}
