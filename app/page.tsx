import { Suspense } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskList } from "@/components/TaskList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          TODO App
        </h1>
        <Link href="/sample">Sample</Link>
      </header>
      <div className="flex-1 p-6 space-y-4">
        <AddTaskForm />
        <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 space-y-2">
          <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
            <TaskList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
