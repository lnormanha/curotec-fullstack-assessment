import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/error.util";
import { ITask } from "../interfaces/task.interface";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";

const prisma = new PrismaClient();

export class TaskService {
  async create(data: CreateTaskDto): Promise<ITask> {
    return await prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<ITask[]> {
    return await prisma.task.findMany();
  }

  async findById(id: number): Promise<ITask> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  }

  async update(id: number, data: UpdateTaskDto): Promise<ITask> {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({
      where: { id },
    });
  }
}
