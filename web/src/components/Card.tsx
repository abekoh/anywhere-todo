import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Stack,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { Task } from "../types";
import { TaskV2 } from "../types/z";

type Props = {
  task: TaskV2;
  saveTask: (draftedTask: TaskV2) => void;
};

export const TaskCard: React.FC<Props> = ({ task, saveTask }) => {
  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    saveTask({ ...task, done: checked });
  };

  const handleInputChange =
    (key: keyof Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      saveTask({ ...task, [key]: value });
    };

  return (
    <Card size="sm" direction={{ base: "column", sm: "row" }} p={2}>
      <Checkbox
        size="lg"
        p={2}
        isChecked={task.done}
        onChange={handleDoneChange}
      />
      <Stack>
        <CardHeader>
          <Input
            size="lg"
            fontWeight="bold"
            variant="unstyled"
            value={task.title}
            onChange={handleInputChange("title")}
          ></Input>
        </CardHeader>
        <CardBody>
          <Input
            variant="unstyled"
            value={task.detail ?? ""}
            onChange={handleInputChange("detail")}
          ></Input>
          <Tag size="sm" mt={2}>
            {task.valueStatus.toUpperCase()}
          </Tag>
          {task.synced && (
            <Tag size="sm" mt={2}>
              Synced
            </Tag>
          )}
          {task.offline && (
            <Tag size="sm" mt={2}>
              Offline
            </Tag>
          )}
        </CardBody>
      </Stack>
    </Card>
  );
};
