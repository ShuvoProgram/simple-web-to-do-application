import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import { Stack } from "@chakra-ui/react";

export const metadata = {
  title: "simple to-do web application",
  description: "Created for Caretutors Technologies Ltd Assessment",
};

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div>
        
      </div>
      <h1 className="text-2xl text-center dark:text-white font-bold mb-4">To-Do App</h1>
      <ThemeToggle />
        <Stack spacing={4}>
        <AddTask />
        <TaskList />
        </Stack>
    </div>
  );
}
