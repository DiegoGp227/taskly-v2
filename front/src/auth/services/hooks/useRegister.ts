import { useState, useCallback } from "react";
import { SignupUserURL } from "@/src/shared/constants/urls";
import { postFetcher } from "@/utils/utils";
import { LoginResponse, RegisterCredentials } from "../../types/types";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = SignupUserURL.toString();
      const response = await postFetcher<LoginResponse>(
        url,
        {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword,
        },
      );

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo));
      }

      return response;
    } catch (err: unknown) {
      let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { status?: number; data?: { message?: string } }; request?: unknown };
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
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
    register,
  };
}
