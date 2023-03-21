import { Container, Spinner, VStack } from "@chakra-ui/react";
import { useGetTask } from "./api/tasks";
import { TaskCard } from "./components/Card";
import React, { useCallback, useEffect, useState } from "react";
import { DraftedTask, Task } from "./types";

const App = () => {
  const { data: apiTasks } = useGetTask({
    refreshInterval: 3000,
  });

  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  const saveTask = useCallback(
    (draftedTask: DraftedTask) => {
      const syncedTarget = apiTasks.find(
        (t) => t.taskId === draftedTask.taskId
      );
      const updated: Task = syncedTarget
        ? { ...draftedTask, draftStatus: "updated" }
        : { ...draftedTask, draftStatus: "new" };
      setLocalTasks((prev) => {
        return [...prev.filter((t) => t.taskId !== updated.taskId), updated];
      });
    },
    [apiTasks]
  );

  useEffect(() => {
    setLocalTasks(apiTasks);
  }, [setLocalTasks, apiTasks]);

  if (!localTasks) {
    return <Spinner />;
  }

  return (
    <Container>
      <VStack alignItems="flex-start">
        {localTasks.map((task) => (
          <TaskCard key={task.taskId} task={task} saveTask={saveTask} />
        ))}
      </VStack>
    </Container>
  );
};

export default App;
