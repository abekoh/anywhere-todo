export type TaskId = string;

export type TaskLogId = string;

export type ValueStatus = "unchanged" | "new" | "updated";

export type Task = {
  taskId: TaskId;
  taskLogId?: TaskLogId;
  title: string;
  detail?: string;
  done: boolean;
  deadline?: Date;
  valueStatus: ValueStatus;
  synced: boolean;
  offline: boolean;
};
