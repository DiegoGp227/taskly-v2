"use client";

import { useAuth } from "@/src/auth/hooks/useAuth";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        Verificando autenticación...
      </div>
    );
  }

  return <>{children}</>;
}
