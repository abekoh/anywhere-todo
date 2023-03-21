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

export const TaskCard: React.FC<Props> = ({ task }) => (
  <Card size="sm" direction={{ base: "column", sm: "row" }} p={2}>
    <Checkbox size="lg" p={2} isChecked={task.done} />
    <Stack>
      <CardHeader>
        <Input
          size="lg"
          fontWeight="bold"
          variant="unstyled"
          value={task.detail}
        ></Input>
      </CardHeader>
      <CardBody>
        <Input variant="unstyled" value={task.detail}></Input>
      </CardBody>
    </Stack>
  </Card>
);
