import { BaseURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";
import { useState } from "react";

interface TaskData {
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

interface PostTaskResponse {
  message: string;
  taskId: number;
}

export default function usePostTask() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createTask = async (taskData: TaskData): Promise<PostTaskResponse | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = new URL("/api/tasks", BaseURL).toString();

      const response = await postFetcher<PostTaskResponse>(url, taskData);

      console.log("Task created successfully:", response);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTask,
    isLoading,
    error,
    success,
  };
}
