
import apiClient from "@/src/shared/services/apiClient";
import { AxiosError } from "axios";

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url); 
    return response.data; 
  } catch (error: unknown) {
    const status = (error as AxiosError).response?.status || "unknown";
    const errorMessage = `An error occurred while fetching the data from ${url} with status ${status}`;

    const errorDetails =
      (error as AxiosError).response?.data || "No additional error information";

    const customError = new Error(errorMessage) as Error & {
      details?: unknown;
    };
    customError.details = errorDetails;
    throw customError;
  }
};

export const postFetcher = async <T>(
  url: string,
  params: Record<string, string> | FormData,
  contentType?: string
): Promise<T> => {
  try {
    // Usa apiClient para realizar la solicitud
    const response = await apiClient.post<T>(url, params, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Registra el error en la consola para depuración
    console.error(`Error in postFetcher for ${url}:`, axiosError);

    // Lanza el error completo para que el código que llama pueda manejarlo
    throw axiosError;
  }
};

export const deleteFetcher = async (
  url: string, // URL del recurso a eliminar
  contentType?: string // Tipo de contenido opcional (si es necesario)
) => {
  try {
    // Usa apiClient para realizar la solicitud DELETE
    const response = await apiClient.delete(url, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Registra el error en la consola para depuración
    console.error(`Error in deleteFetcher for ${url}:`, axiosError);

    // Lanza el error completo para que el código que llama pueda manejarlo
    throw axiosError;
  }
};

export const putFetcher = async <T>(
  url: string, // URL del recurso a actualizar
  params: T, // Datos que se enviarán en el cuerpo de la solicitud
  contentType?: string // Tipo de contenido opcional (si es necesario)
) => {
  try {
    // Usa apiClient para realizar la solicitud PUT
    const response = await apiClient.put(url, params, {
      headers: {
        "Content-Type": contentType ? contentType : "application/json",
      },
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Registra el error en la consola para depuración
    console.error(`Error in putFetcher for ${url}:`, axiosError);

    // Lanza el error completo para que el código que llama pueda manejarlo
    throw axiosError;
  }
};
