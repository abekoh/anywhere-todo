export type TaskId = string;

export type TaskLogId = string;

export type ValueStatus = "unchanged" | "new" | "updated";

export type SyncStatus = "unsaved" | "local" | "remote";

export type Task = {
  taskId: TaskId;
  taskLogId?: TaskLogId;
  title: string;
  detail?: string;
  done: boolean;
  deadline?: Date;
  valueStatus: ValueStatus;
  syncStatus: SyncStatus;
};
