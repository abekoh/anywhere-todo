import {Task} from "../types";

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

export const useTasks = (): [tasks: Task[]] => {
    return [mockTasks];
};