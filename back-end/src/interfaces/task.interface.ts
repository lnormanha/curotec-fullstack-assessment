export interface ITask {
  id: number;
  title: string;
  startTime: Date;
  completed: boolean;
  routineId: number;
  createdAt: Date;
  updatedAt: Date;
}
