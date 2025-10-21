import { BaseURL, TasksBaseURL } from "@/src/shared/constants/urls";
import { putFetcher } from "@/utils/utils";
import { useState } from "react";

interface UpdateTaskData {
  title?: string;
  priority?: number;
  status?: number;
}

interface UpdateTaskResponse {
  message: string;
}

export default function usePutTask() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<unknown>(null);

  const [success, setSuccess] = useState<boolean>(false);

  const updateTask = async (
    taskId: number,
    taskData: UpdateTaskData
  ): Promise<UpdateTaskResponse | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = new URL(`${TasksBaseURL}/${taskId}`, BaseURL).toString();

      const response = await putFetcher<UpdateTaskResponse>(url, taskData);

      console.log("Task updated successfully:", response);

      setSuccess(true);

      return response;
    } catch (err) {
      setError(err);

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateTask,
    isLoading,
    error,
    success,
  };
}
