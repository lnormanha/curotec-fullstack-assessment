import { Prisma } from "@prisma/client";
import { Without } from "../interfaces/general.interface";

// Define the 'Without' type

export type CreateRoutineDto = Without<
  Prisma.RoutineCreateInput,
  Prisma.RoutineUncheckedCreateInput
> &
  Prisma.RoutineCreateInput;

export type UpdateRoutineDto = Without<
  Prisma.RoutineUpdateInput,
  Prisma.RoutineUncheckedUpdateInput
> &
  Prisma.RoutineUpdateInput;
