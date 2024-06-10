"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Task } from "@/types/task";
import { v4 as uuidV4 } from "uuid";
import { useRouter } from "next/navigation";
// import { addTask } from "@/actions/taskActions";

export function AddTaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body: Task = { id: uuidV4(), title, isCompleted: false };
    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setTitle("");
    router.refresh();
  };

  // const handleSubmit = async () => {
  //   const body: Task = { id: uuidV4(), title, isCompleted: false };
  //   addTask(body);
  //   setTitle("");
  // };

  return (
    <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a new task..."
        className="flex-1 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
      >
        Add
      </Button>
    </form>
  );
}
