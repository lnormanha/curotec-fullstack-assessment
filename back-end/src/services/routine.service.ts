import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/error.util";
import { IRoutine } from "../interfaces/routine.interface";
import { CreateRoutineDto, UpdateRoutineDto } from "../dtos/routine.dto";
import { createCache } from "cache-manager";
import Keyv from "keyv";

const prisma = new PrismaClient();
const cache = createCache({
  stores: [new Keyv()],
});

export class RoutineService {
  async create(data: CreateRoutineDto): Promise<IRoutine> {
    const routine = await prisma.routine.create({
      data: { ...data, createdAt: new Date(), updatedAt: new Date() },
      include: { tasks: false },
    });

    // Invalidate cache for all pages
    await cache.clear();

    return routine;
  }

  async findAll(page: number, limit: number): Promise<IRoutine[]> {
    const cacheKey = `routines_page_${page}_limit_${limit}`;
    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
      return cachedData as IRoutine[];
    }

    const routines = await prisma.routine.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { tasks: true },
    });

    await cache.set(cacheKey, routines, 60 * 60); // Cache for 1 hour
    return routines;
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
    const routine = await prisma.routine.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
      include: { tasks: true },
    });

    await cache.clear();

    return routine;
  }

  async delete(id: number): Promise<void> {
    await prisma.routine.delete({
      where: { id },
    });

    // Invalidate cache for all pages
    await cache.clear();
  }
}
