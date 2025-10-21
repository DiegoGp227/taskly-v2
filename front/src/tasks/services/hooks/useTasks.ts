import { useEffect } from "react";
import useGetTasks from "./useGetTasks";
import usePostTask from "./usePostTask";
import usePutTask from "./usePutTask";
import useDeleteTask from "./useDeleteTask";

export default function useTasks({ topicId }: { topicId: number }) {
  const {
    data: getData,
    isLoading: isGetLoading,
    error: gettasksError,
    fetchData: getfetchData,
  } = useGetTasks();

  const {
    createTask,
    isLoading: isPostLoading,
    error: postTaskError,
  } = usePostTask();

  const {
    updateTask,
    isLoading: isPutLoading,
    error: putTaskError,
  } = usePutTask();

  const {
    deleteTask,
    isLoading: isDeleteLoading,
    error: deleteTaskError,
  } = useDeleteTask();

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
    isPostLoading,
    postTaskError,
    refetch: () => getfetchData({ topicId }),

    updateTask,
    isPutLoading,
    putTaskError,

    deleteTask,
    isDeleteLoading,
    deleteTaskError,
  };
}
