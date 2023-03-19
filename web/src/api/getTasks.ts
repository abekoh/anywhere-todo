import {Task} from "../types";
import gql from "graphql-tag";
import {GraphQLClient} from "graphql-request";
import {getSdk} from "../gql/client";
import useSWR, {SWRConfiguration} from 'swr'

const mockTasks: Task[] = [
    {
        taskId: "1",
        taskLogId: "11",
        title: "Task 1",
        done: false,
    },
    {
        taskId: "2",
        taskLogId: "21",
        title: "Task 2",
        detail: "Task 2 detail",
        done: false,
        deadline: new Date("2021-01-01"),
    },
    {
        taskId: "3",
        taskLogId: "32",
        title: "Task 3",
        done: true,
    }
]

const allTasks = gql`
    query allTasks {
        tasks {
            taskId
            taskLogId
            title
            detail
            done
            deadline
        }
    }
`
const getTasks = async (): Promise<Task[]> => {
    const client = new GraphQLClient("http://localhost:8080/query");
    const sdk = getSdk(client);
    const res = await sdk.allTasks();
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
        })
    )
}

export const useTasks = (options?: SWRConfiguration<Task[], Error>) => {
    const client = new GraphQLClient("http://localhost:8080/query");
    const sdk = getSdk(client);
    return useSWR<Task[], Error>("allTasks", getTasks, options);
};