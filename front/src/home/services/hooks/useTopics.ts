// import { useEffect } from "react";
import useDeleteTopics from "./useDeleteTopics";
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

  const {
    deleteTopics,
    isLoading: loadingDeleteTopic,
    error: errorDeleteTopic,
  } = useDeleteTopics();

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

    deleteTopics,
    loadingDeleteTopic,
    errorDeleteTopic,
  };
}
