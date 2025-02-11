import { Router } from "express";
import { body } from "express-validator";
import {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routine.controller";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/",
  [
    body("title").notEmpty().trim().isString(),
    body("description").optional().isString(),
  ],
  validate,
  createRoutine
);

router.get("/", getRoutines);
router.get("/:id", getRoutineById);

router.put(
  "/:id",
  [
    body("title").optional().trim().isString(),
    body("description").optional().isString(),
  ],
  validate,
  updateRoutine
);

router.delete("/:id", deleteRoutine);

export { router as routineRouter };
