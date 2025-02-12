export interface ITask {
  id: number;
  title: string;
  startTime: string;
  completed: boolean;
  routineId: number;
  createdAt: Date;
  updatedAt: Date;
}
