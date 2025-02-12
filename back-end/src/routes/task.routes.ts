import { Router } from "express";
import { body } from "express-validator";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/",
  [
    body("title").notEmpty().trim().isString(),
    body("description").optional().isString(),
    body("startTime").isISO8601(),
    body("completed").optional().isBoolean(),
    body("routineId").isInt().notEmpty(),
  ],
  validate,
  createTask
);

router.get("/", getTasks);
router.get("/:id", getTaskById);

router.put(
  "/:id",
  [
    body("title").optional().trim().isString(),
    body("startTime").optional().isISO8601(),
    body("completed").optional().isBoolean(),
    body("routineId").optional().isInt(),
  ],
  validate,
  updateTask
);

router.delete("/:id", deleteTask);

export { router as taskRouter };
