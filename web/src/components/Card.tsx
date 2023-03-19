import {Card, CardBody, CardHeader, Checkbox, Heading, Stack, Text} from "@chakra-ui/react";
import React from "react";
import {Task} from "../types";

type Props = {
    task: Task
}

export const TaskCard: React.FC<Props> = ({task}) => (
    <Card size="sm" direction={{base: "column", sm: "row"}} p={2}>
        <Checkbox size="lg" p={2} isChecked={task.done}/>
        <Stack>
            <CardHeader><Heading size="md">{task.title}</Heading></CardHeader>
            <CardBody><Text>{task.detail}</Text></CardBody>
        </Stack>
    </Card>
)
