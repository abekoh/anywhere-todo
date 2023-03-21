export type TaskId = string;

export type TaskLogId = string;

export type DraftStatus = "synced" | "new" | "updated";

export type Task = {
  taskId: TaskId;
  taskLogId?: TaskLogId;
  title: string;
  detail?: string;
  done: boolean;
  deadline?: Date;
  draftStatus: DraftStatus;
};

type NewTask = {
  title: string;
  detail?: string;
  deadline?: Date;
};

type UpdatedTask = {
  taskId: TaskId;
  title?: string;
  detail?: string;
  done?: boolean;
  deadline?: Date;
};
