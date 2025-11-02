// import { useEffect } from "react";
import useGetTopics from "./useGetTopics";
import usePostTopics from "./usePostTopics";
import usePutTopics from "./usePutTopics";

export default function useTopics() {
  const {
    topics,
    isLoading: loadingTopics,
    error: errorTopics,
    refresh: refetchTopics,
  } = useGetTopics();

  const {
    createTopic,
    isLoading: loaginPostTopic,
    error: sendError,
  } = usePostTopics();

  const {
    updateTopic,
    isLoading: loadingPutTopics,
    error: putTopicError,
  } = usePutTopics();

  // const {
  //   deleteTask,
  //   isLoading: isDeleteLoading,
  //   error: deleteTaskError,
  // } = useDeleteTask();

  // useEffect(() => {
  //   if (!isNaN(topicId)) {
  //     getfetchData({ topicId });
  //   }
  // }, [topicId, getfetchData]);

  // const todoTasks = getData?.todo || [];
  // const completedTasks = getData?.done || [];

  return {
    topics,
    loadingTopics,
    errorTopics,
    refetchTopics,
    // Tareas separadas por status
    createTopic,
    loaginPostTopic,
    sendError,

    updateTopic,
    loadingPutTopics,
    putTopicError,
  };
}
