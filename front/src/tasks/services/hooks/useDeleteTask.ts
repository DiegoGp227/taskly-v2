import { BaseURL, TasksBaseURL } from "@/src/shared/constants/urls";
import { deleteFetcher } from "@/utils/utils";
import { useState } from "react";

interface DeleteTaskResponse {
  message: string;
}

export default function useDeleteTask() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteTask = async (
    taskId: number,
  ): Promise<DeleteTaskResponse | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = new URL(`${TasksBaseURL}/${taskId}`, BaseURL).toString();

      const response = await deleteFetcher(url) as DeleteTaskResponse;

      console.log("Task deleted successfully:", response);

      setSuccess(true);

      return response;
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err);

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteTask,
    isLoading,
    error,
    success,
  };
}
