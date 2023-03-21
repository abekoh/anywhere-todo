import { Task } from "../types";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "../gql/client";
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
  }));
};

const updateTask = async (task: Task): Promise<Task> => {
  const res = await setupSdk().UpdateTask({
    taskId: task.taskId,
    title: task.title,
    detail: task.detail ?? undefined,
    done: task.done,
    deadline: task.deadline ? task.deadline.toISOString() : undefined,
  });
  if (!res.data) {
    throw new Error("failed");
  }
  return {
    taskId: res.data.updateTask.taskId,
    taskLogId: res.data.updateTask.taskLogId,
    title: res.data.updateTask.title,
    detail: res.data.updateTask.detail ?? undefined,
    done: res.data.updateTask.done,
    deadline: res.data.updateTask.deadline
      ? new Date(res.data.updateTask.deadline)
      : undefined,
  };
};

export const useTask = (options?: SWRConfiguration<Task[], Error>) => {
  return useSWR<Task[], Error>("tasks", tasks, options);
};

export const useUpdateTask = (mutateOptions?: UseMutationOption<Task>) => {
  return useMutation(updateTask, mutateOptions);
};
