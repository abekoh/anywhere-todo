import { GraphQLClient } from "graphql-request";
import { getSdk, NewTask, UpdatedTask } from "../gql/client";
import useSWR, { SWRConfiguration } from "swr";
import { useMutation, UseMutationOption } from "./use-mutation";
import { taskV2, TaskV2 } from "../types/z";

const setupSdk = () => {
  const client = new GraphQLClient("http://localhost:8080/query");
  return getSdk(client);
};

const tasks = async (): Promise<TaskV2[]> => {
  const res = await setupSdk().AllTasks();
  if (!res.data) {
    throw new Error("No data");
  }
  return res.data.tasks.map((task) =>
    taskV2.parse({
      taskId: task.taskId,
      taskLogId: task.taskLogId,
      title: task.title,
      detail: task.detail ?? undefined,
      done: task.done,
      deadline: task.deadline ? new Date(task.deadline) : undefined,
      valueStatus: "unchanged",
      synced: true,
      offline: false,
    })
  );
};

const syncTasks = async (tasks: TaskV2[]): Promise<TaskV2[]> => {
  const newTasks: NewTask[] = tasks
    .filter((task) => task.valueStatus === "new")
    .map((task) => ({
      taskId: task.taskId,
      title: task.title,
      detail: task.detail,
      done: task.done,
      deadline: task.deadline,
    }));
  const updatedTasks: UpdatedTask[] = tasks
    .filter((task) => task.valueStatus === "updated")
    .map((task) => ({
      taskId: task.taskId,
      title: task.title,
      detail: task.detail,
      done: task.done,
      deadline: task.deadline,
    }));
  const res = await setupSdk().SyncTasks({ tasks: { newTasks, updatedTasks } });
  return res.data.syncTasks.map((task) =>
    taskV2.parse({
      taskId: task.taskId,
      taskLogId: task.taskLogId,
      title: task.title,
      detail: task.detail ?? undefined,
      done: task.done,
      deadline: task.deadline ? new Date(task.deadline) : undefined,
      valueStatus: "unchanged",
      synced: true,
      offline: false,
    })
  );
};

export const useGetTask = (options?: SWRConfiguration<TaskV2[], Error>) => {
  return useSWR<TaskV2[], Error>("tasks", tasks, options);
};

export const useSyncTask = (mutateOptions?: UseMutationOption<TaskV2[]>) => {
  return useMutation(syncTasks, mutateOptions);
};
