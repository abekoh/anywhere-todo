import { Container, Spinner, VStack } from "@chakra-ui/react";
import { useTaskAPI } from "./api/tasks";
import { TaskCard } from "./components/Card";
import React, { useEffect, useState } from "react";
import { Task } from "./types";

const app = () => {
  const { data: apiTasks } = useTaskAPI({
    refreshInterval: 3000,
  });

  const [localTasks, setLocalTasks] = useState<Task[]>([]);

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
          <TaskCard key={task.taskId} task={task} />
        ))}
      </VStack>
    </Container>
  );
};

export default app;
