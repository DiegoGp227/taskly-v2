import { useState, useCallback } from "react";
import { TopicsURL } from "@/src/shared/constants/urls";
import { fetcher } from "@/utils/utils";
import { Topic } from "@/src/auth/types/types";

export default function useGetTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los topics y actualizar estado
  const getTopics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = TopicsURL.toString();
      const data = await fetcher<Topic[]>(url);
      if (data) setTopics(data);
      return data;
    } catch (err: any) {
      const errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para refrescar los topics desde el componente
  const refresh = useCallback(() => {
    return getTopics();
  }, [getTopics]);

  return {
    topics,
    isLoading,
    error,
    refresh,
  };
}
