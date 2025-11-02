import { TopicsURL } from "@/src/shared/constants/urls";
import { putFetcher } from "@/utils/utils";
import { useState } from "react";

interface UpdateTopicData {
  title?: string;
  description?: string;
}

interface UpdateTopicResponse {
  message: string;
}

export default function usePutTopics() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<unknown>(null);

  const [success, setSuccess] = useState<boolean>(false);

  const updateTopic = async (
    topicId: number,
    topicData: UpdateTopicData
  ): Promise<UpdateTopicResponse | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const url = new URL(`${TopicsURL}/${topicId}`).toString();

      const response = await putFetcher<UpdateTopicResponse>(url, topicData);

      console.log("Topic updated successfully:", response);

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
    updateTopic,
    isLoading,
    error,
    success,
  };
}
