import { PrismaClient, Prisma } from "@prisma/client";
import { AppError } from "../utils/error.util";
import { IRoutine } from "../interfaces/routine.interface";
import { CreateRoutineDto, UpdateRoutineDto } from "../dtos/routine.dto";

const prisma = new PrismaClient();

export class RoutineService {
  async create(data: CreateRoutineDto): Promise<IRoutine> {
    return await prisma.routine.create({
      data: { ...data, createdAt: new Date(), updatedAt: new Date() },
      include: { tasks: false },
    });
  }

  async findAll(): Promise<IRoutine[]> {
    return await prisma.routine.findMany({
      include: { tasks: true },
    });
  }

  async findById(id: number): Promise<IRoutine> {
    const routine = await prisma.routine.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!routine) {
      throw new AppError("Routine not found", 404);
    }

    return routine;
  }

  async update(id: number, data: UpdateRoutineDto): Promise<IRoutine> {
    return await prisma.routine.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: { tasks: true },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.routine.delete({
      where: { id },
    });
  }
}
