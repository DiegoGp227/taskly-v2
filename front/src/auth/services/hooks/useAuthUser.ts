import { useState, useCallback } from "react";
import { AuthUserURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";
import { LoginCredentials, LoginResponse } from "../../types/types";

export default function useAuthUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = AuthUserURL.toString();
      const response = await postFetcher<LoginResponse>(
        url,
        {
          email: credentials.email,
          password: credentials.password,
        },
        "application/json"
      );

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
      }

      return response;
    } catch (err: any) {
      let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
            break;
          case 500:
            errorMessage = "Error del servidor. Inténtalo más tarde.";
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.request) {
        errorMessage = "Error de conexión. Verifica tu conexión a internet.";
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  }, []);

  return {
    isLoading,
    error,
    login,
    logout,
  };
}
