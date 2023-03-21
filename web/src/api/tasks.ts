import { Task } from "../types";
import { GraphQLClient } from "graphql-request";
import { getSdk, NewTask, UpdatedTask } from "../gql/client";
import useSWR, { SWRConfiguration } from "swr";
import { useMutation, UseMutationOption } from "./use-mutation";

const setupSdk = () => {
  const client = new GraphQLClient("http://localhost:8080/query");
  return getSdk(client);
};

const tasks = async (): Promise<Task[]> => {
  const res = await setupSdk().AllTasks();
  if (!res.data) {
    throw new Error("No data");
  }
  return res.data.tasks.map((task) => ({
    taskId: task.taskId,
    taskLogId: task.taskLogId,
    title: task.title,
    detail: task.detail ?? undefined,
    done: task.done,
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    draftStatus: "synced",
  }));
};

const syncTasks = async (tasks: Task[]): Promise<Task[]> => {
  const newTasks: NewTask[] = tasks
    .filter((task) => task.draftStatus === "new")
    .map((task) => ({
      taskId: task.taskId,
      title: task.title,
      detail: task.detail,
      done: task.done,
      deadline: task.deadline,
    }));
  const updatedTasks: UpdatedTask[] = tasks
    .filter((task) => task.draftStatus === "updated")
    .map((task) => ({
      taskId: task.taskId,
      title: task.title,
      detail: task.detail,
      done: task.done,
      deadline: task.deadline,
    }));
  const res = await setupSdk().SyncTasks({ tasks: { newTasks, updatedTasks } });
  return res.data.syncTasks.map((task) => ({
    taskId: task.taskId,
    taskLogId: task.taskLogId,
    title: task.title,
    detail: task.detail ?? undefined,
    done: task.done,
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    draftStatus: "synced",
  }));
};

export const useGetTask = (options?: SWRConfiguration<Task[], Error>) => {
  return useSWR<Task[], Error>("tasks", tasks, options);
};

export const useSyncTask = (mutateOptions?: UseMutationOption<Task[]>) => {
  return useMutation(syncTasks, mutateOptions);
};
