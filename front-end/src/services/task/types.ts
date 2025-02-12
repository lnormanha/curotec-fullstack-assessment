export interface CreateTaskDto {
  title: string;
  description?: string;
  startTime: string;
  routineId: number;
}

export interface UpdateTaskDto {
  id: number;
  title?: string;
  description?: string;
  startTime?: string;
  completed?: boolean;
}
