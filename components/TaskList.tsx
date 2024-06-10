import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

const getTodos = async (): Promise<Task[]> => {
  const res = await fetch("http://localhost:3001/tasks", {
    cache: "no-store",
    next: { tags: ["tasks"] },
  });
  const data = await res.json();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });

  return data;
};

export async function TaskList() {
  const tasks = await getTodos();

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
