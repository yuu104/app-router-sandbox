"use server";

import { Task } from "@/types/task";
import { revalidateTag } from "next/cache";

export const addTask = async (body: Task) => {
  "use server";

  await fetch("http://localhost:3001/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });

  revalidateTag("tasks");
};
