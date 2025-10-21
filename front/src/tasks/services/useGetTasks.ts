import { BaseURL } from "@/src/shared/constants/urls";
import { fetcher } from "@/utils/utils";
import { useCallback, useState } from "react";

interface Task {
  id: number;
  user_id: number;
  topics_id: number;
  title: string;
  priority: number;
  status: number;
}

interface TasksResponse {
  todo: Task[];
  done: Task[];
}

interface IUseGetTasksProps {
  topicId: number;
}

export default function useGetTasks() {
  const [data, setData] = useState<TasksResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(
    async ({ topicId }: IUseGetTasksProps) => {
      setIsLoading(true);
      setError(null);

      try {
        // Construir URL para obtener todas las tareas organizadas
        const url = new URL(`/api/tasks/${topicId}`, BaseURL).toString();

        const json = await fetcher<TasksResponse>(url);
        console.log("API response received:", json);

        // El backend devuelve { todo: [...], done: [...] }
        setData(json);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
}
