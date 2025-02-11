import { Prisma } from "@prisma/client";
import { Without } from "../interfaces/general.interface";

export type CreateTaskDto = Without<
  Prisma.TaskCreateInput,
  Prisma.TaskUncheckedCreateInput
> &
  Prisma.TaskCreateInput;

export type UpdateTaskDto = Without<
  Prisma.TaskUpdateInput,
  Prisma.TaskUncheckedUpdateInput
> &
  Prisma.TaskUpdateInput;
