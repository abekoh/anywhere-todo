import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { DraftedTask } from "../types";

type Props = {
  task: DraftedTask;
  saveTask: (draftedTask: DraftedTask) => void;
};

export const TaskCard: React.FC<Props> = ({ task, saveTask }) => {
  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    saveTask({ ...task, done: checked });
  };

  const handleInputChange =
    (key: keyof DraftedTask) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
        </CardBody>
      </Stack>
    </Card>
  );
};
