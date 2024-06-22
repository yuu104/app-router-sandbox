"use client";

import { startTransition, useOptimistic, useState } from "react";
import { Task } from "@/types/task";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { SaveButton } from "@/components/SaveButton";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
};

export function TaskItem({ task }: Props) {
  const router = useRouter();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const [optimisticTask, addOptimistic] = useOptimistic<Task | undefined>(task);
  optimisticTask?.title === "Call mom" && console.log(optimisticTask);

  const handleToggleDoneTask = async () => {
    const body: Task = { ...task, isCompleted: !task.isCompleted };
    startTransition(async () => {
      addOptimistic(body);
      await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      router.refresh();
    });
  };

  const handleEditButtonClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    setIsEditingTitle(false);
    if (task.title === editedTitle) return;
    const body: Task = { ...task, title: editedTitle };
    startTransition(async () => {
      addOptimistic(body);
      await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      router.refresh();
    });
  };

  const handleDeleteTask = async () => {
    startTransition(async () => {
      addOptimistic(undefined);
      await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "DELETE",
      });
      router.refresh();
    });
  };

  if (!optimisticTask) return null;

  return (
    <div className="flex items-center space-x-4">
      <Checkbox
        checked={optimisticTask.isCompleted}
        onCheckedChange={handleToggleDoneTask}
      />
      {isEditingTitle ? (
        <Input
          type="text"
          className="flex-1 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <label
          className={`flex-1 text-gray-800 dark:text-gray-200 ${
            optimisticTask.isCompleted ? "line-through" : ""
          }`}
        >
          {optimisticTask.title}
        </label>
      )}
      {isEditingTitle ? (
        <SaveButton handleClick={handleSaveTitle} />
      ) : (
        <EditButton handleClick={handleEditButtonClick} />
      )}
      <DeleteButton handleClick={handleDeleteTask} />
    </div>
  );
}
