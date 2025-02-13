import { Request, Response, NextFunction } from "express";
import { RoutineService } from "../services/routine.service";

const routineService = new RoutineService();

export const createRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const routine = await routineService.create(req.body);
    res.status(201).json(routine);
  } catch (error) {
    next(error);
  }
};

export const getRoutines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const routines = await routineService.findAll(page, limit);
    res.json(routines);
  } catch (error) {
    next(error);
  }
};

export const getRoutineById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const routine = await routineService.findById(Number(req.params.id));
    res.json(routine);
  } catch (error) {
    next(error);
  }
};

export const updateRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const routine = await routineService.update(
      Number(req.params.id),
      req.body
    );
    res.json(routine);
  } catch (error) {
    next(error);
  }
};

export const deleteRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await routineService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
