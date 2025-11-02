import { TopicsURL } from "@/src/shared/constants/urls";
import { deleteFetcher } from "@/utils/utils";
import { useState } from "react";

interface IDeleteTopicsResponse {
  message: string;
}

export default function useDeleteTopics() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const deleteTopics = async (
    topicId: number,
  ): Promise<IDeleteTopicsResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const url = new URL(`${TopicsURL}/${topicId}`).toString();

      const response = await deleteFetcher(url) as IDeleteTopicsResponse;

      console.log("Topic deleted successfully:", response);

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
    deleteTopics,
    isLoading,
    error,
  };
}
