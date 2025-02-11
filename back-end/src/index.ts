import express from "express";
import cors from "cors";
import { routineRouter } from "./routes/routine.routes";
import { errorHandler } from "./middleware/error.middleware";
import { taskRouter } from "./routes/task.routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/routines", routineRouter);
app.use("/tasks", taskRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
