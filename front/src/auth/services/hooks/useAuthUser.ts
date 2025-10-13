import { useState, useCallback } from "react";
import { AuthUserURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";

export default function useAuthUser() {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = useCallback(async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = AuthUserURL.toString();
      const response = await postFetcher<any>(url, credentials, "application/json");
      setUser(response);
      return response;
    } catch (err) {
      setError(err);
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
