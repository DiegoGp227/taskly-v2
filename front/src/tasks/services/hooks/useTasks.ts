import { useEffect } from "react";
import useGetTasks from "./useGetTasks";
import usePostTask from "./usePostTask";


export default function useTasks({ topicId }: { topicId: number }) {
  const {
    data: getData,
    isLoading: isGetLoading,
    error: gettasksError,
    fetchData: getfetchData,
  } = useGetTasks();

  const { createTask, isLoading: ispostLoading, error: postTaskError } = usePostTask();

  useEffect(() => {
    if (!isNaN(topicId)) {
      getfetchData({ topicId });
    }
  }, [topicId, getfetchData]);

  const todoTasks = getData?.todo || [];
  const completedTasks = getData?.done || [];

  return {
    // Tareas separadas por status
    todoTasks,
    completedTasks,

    // Estados de carga y error para GET
    isGetLoading,
    gettasksError,

    // Función para crear nuevas tareas (POST)
    createTask,
    ispostLoading,
    postTaskError,

    // Función para recargar las tareas manualmente
    // Útil después de crear/editar una tarea
    refetch: () => getfetchData({ topicId }),
  };
}
