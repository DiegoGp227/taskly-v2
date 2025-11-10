"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === "undefined") {
      return;
    }

    const token = localStorage.getItem("token");

    // Rutas públicas que no requieren autenticación
    const publicRoutes = ["/login", "/sign_up", "/not-found"];
    const isPublicRoute = publicRoutes.includes(pathname);

    console.log("Verificando autenticación:", { token: !!token, pathname, isPublicRoute });

    if (!token && !isPublicRoute) {
      // No hay token y no es una ruta pública, redirigir a login
      console.log("Redirigiendo a login...");
      router.replace("/login");
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [pathname, router]);

  return { isAuthenticated, isLoading };
};
