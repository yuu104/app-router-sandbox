"use client";

import { useState } from "react";
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

  const handleToggleDoneTask = async () => {
    const body: Task = { ...task, isCompleted: !task.isCompleted };
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    router.refresh();
  };

  const handleEditButtonClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    setIsEditingTitle(false);
    if (task.title === editedTitle) return;
    const body: Task = { ...task, title: editedTitle };
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    router.refresh();
  };

  const handleDeleteTask = async () => {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-4">
      <Checkbox
        checked={task.isCompleted}
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
            task.isCompleted ? "line-through" : ""
          }`}
        >
          {task.title}
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
