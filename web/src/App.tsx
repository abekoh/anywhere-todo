import {Container, VStack} from "@chakra-ui/react";
import {useTasks} from "./api/getTasks";
import {TaskCard} from "./components/Card";

const app = () => {
    const [tasks] = useTasks();

    return <Container>
        <VStack alignItems="flex-start">
            {tasks.map(task => <TaskCard key={task.taskId} task={task}/>)}
        </VStack>
    </Container>
}

export default app
