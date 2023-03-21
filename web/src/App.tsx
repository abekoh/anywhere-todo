import { Button, Container, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useGetTask, useSyncTask } from "./api/tasks";
import { TaskCard } from "./components/Card";
import React, { useCallback, useEffect, useState } from "react";
import { Task } from "./types";

const App = () => {
  const { data: apiTasks } = useGetTask({
    refreshInterval: 3000,
  });

  const toast = useToast();

  const { request } = useSyncTask({
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

  const handleSync = useCallback(async () => {
    await request(localTasks);
  }, [localTasks, request]);

  useEffect(() => {
    setLocalTasks(apiTasks);
  }, [setLocalTasks, apiTasks]);

  if (!localTasks) {
    return <Spinner />;
  }

  return (
    <Container>
      <Button onClick={handleSync}>Sync</Button>
      <VStack alignItems="flex-start">
        {localTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} saveTask={saveTask} />
        ))}
      </VStack>
      <p>{JSON.stringify(localTasks)}</p>
    </Container>
  );
};

export default App;
