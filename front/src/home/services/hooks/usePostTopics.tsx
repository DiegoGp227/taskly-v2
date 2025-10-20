import { useState, useCallback } from "react";
import { TopicsURL } from "@/src/shared/constants/urls"; // URL de tu endpoint de topics
import { postFetcher } from "@/utils/utils";
import { Topic } from "@/src/auth/types/types";

export default function usePostTopics() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTopic = useCallback(async (topic: Topic) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postFetcher<Topic>(TopicsURL.toString(), {
        title: topic.title,
        description: topic.description ?? "",
      });

      return response; // Devuelve el topic creado
    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { status?: number; data?: { message?: string } }; request?: unknown };
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "No autorizado.";
              break;
            case 500:
              errorMessage = "Error del servidor. Inténtalo más tarde.";
              break;
            default:
              errorMessage = error.response.data?.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = "Error de conexión. Verifica tu conexión a internet.";
        }
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createTopic,
  };
}
