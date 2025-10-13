import { useState, useCallback } from "react";
import { SignupUserURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";

export default function useRegister() {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const register = useCallback(async (payload: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = SignupUserURL.toString(); // Asegúrate que esta URL apunte al endpoint de registro
      const response = await postFetcher<any>(url, payload, "application/json");
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
    register,
  };
}
