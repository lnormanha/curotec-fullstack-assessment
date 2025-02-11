export interface ITask {
  id: number;
  title: string;
  description?: string | null;
  startTime: Date;
  completed: boolean;
  routineId: number;
  createdAt: Date;
  updatedAt: Date;
}
