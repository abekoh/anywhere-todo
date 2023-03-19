import {Container, Spinner, VStack} from "@chakra-ui/react";
import {useTasks} from "./api/getTasks";
import {TaskCard} from "./components/Card";

const app = () => {
    const {data: tasks} = useTasks({
        refreshInterval: 3000,
    });

    if (!tasks) {
        return <Spinner/>
    }

    return <Container>
        <VStack alignItems="flex-start">
            {tasks.map(task => <TaskCard key={task.taskId} task={task}/>)}
        </VStack>
    </Container>
}

export default app
