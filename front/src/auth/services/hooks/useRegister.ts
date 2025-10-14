import { useState, useCallback } from "react";
import { AuthUserURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";

export default function useAuthUser() {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ⚡ cambio: string en vez de unknown

  const login = useCallback(async (payload: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = AuthUserURL.toString();
      const response = await postFetcher<any>(url, payload, "application/json");
      setUser(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err)); // ⚡ convertir a string
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
  };
}
