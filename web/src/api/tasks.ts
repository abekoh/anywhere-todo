import { Task } from "../types";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "../gql/client";
import useSWR, { SWRConfiguration } from "swr";

const tasks = async (): Promise<Task[]> => {
  const client = new GraphQLClient("http://localhost:8080/query");
  const sdk = getSdk(client);
  const res = await sdk.AllTasks();
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

export const useTaskAPI = (options?: SWRConfiguration<Task[], Error>) => {
  return useSWR<Task[], Error>("tasks", tasks, options);
};
