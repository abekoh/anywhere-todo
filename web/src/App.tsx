import { Button, Container, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useGetTask, useSyncTask } from "./api/tasks";
import { TaskCard } from "./components/Card";
import React, { useCallback, useEffect, useState } from "react";
import { Task } from "./types";
import { ulid } from "ulid";
import { db } from "./db/db";

const App = () => {
  const { data: apiTasks, mutate: fetch } = useGetTask({
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const toast = useToast();

  const { request, requesting } = useSyncTask({
    onSuccess: () => {
      toast({
        title: "Synced!",
        duration: 2000,
        status: "success",
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: err.message,
        duration: 2000,
        status: "error",
        isClosable: true,
      });
    },
  });

  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  const addTask = useCallback(() => {
    setLocalTasks((prev) => {
      const newTask: Task = {
        taskId: ulid(), // FIXME: reassigned when synced
        title: "",
        done: false,
        draftStatus: "new",
      };
      return [...prev, newTask].sort((a, b) => (a.taskId < b.taskId ? -1 : 1));
    });
  }, []);

  const saveTask = useCallback(
    (draftedTask: Task) => {
      const syncedTarget = apiTasks.find(
        (t) => t.taskId === draftedTask.taskId
      );
      const updated: Task = syncedTarget
        ? { ...draftedTask, draftStatus: "updated" }
        : { ...draftedTask, draftStatus: "new" };
      setLocalTasks((prev) => {
        return [
          ...prev.filter((t) => t.taskId !== updated.taskId),
          updated,
        ].sort((a, b) => (a.taskId < b.taskId ? -1 : 1));
      });
    },
    [apiTasks]
  );

  const syncLocal = useCallback(async () => {
    await db.tasks.bulkPut(localTasks);
  }, [localTasks]);

  const syncRemote = useCallback(async () => {
    await request(localTasks);
    await fetch();
  }, [fetch, localTasks, request]);

  useEffect(() => {
    setLocalTasks(apiTasks);
  }, [setLocalTasks, apiTasks]);

  if (!localTasks || requesting) {
    return <Spinner />;
  }

  return (
    <Container>
      <Button onClick={addTask}>Add</Button>
      <Button onClick={syncLocal}>SyncLocal</Button>
      <Button onClick={syncRemote}>SyncRemote</Button>
      <VStack alignItems="flex-start">
        {localTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} saveTask={saveTask} />
        ))}
      </VStack>
    </Container>
  );
};
export default App;
