"use client";

import FormLogin from "@/src/auth/forms/auth/FormLogin";
import CreateAccount from "./components/atoms/CreateAccount";
import { LoginInput } from "@/src/schemas/auth";
import useRegister from "@/src/auth/services/hooks/useRegister";
import { useRouter } from "next/navigation";
import useAuthUser from "@/src/auth/services/hooks/useAuthUser";

function LoginPage() {
  const { login: loginUser, isLoading, error } = useAuthUser();

  const router = useRouter();
  // Función que se pasará al FormLogin
  const handleLogin = async (data: LoginInput) => {
    const response = await loginUser(data);
    if (response) {
      console.log("Usuario registrado/logueado:", response);
      router.push("/");
    } else {
      console.error("Error al registrar/loguear usuario:", error);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-[400px] flex flex-col items-center border-2 border-soft-gray justify-evenly rounded">
        <h1 className="text-white font-bold text-4xl">Login</h1>
        <FormLogin onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <CreateAccount />
      </div>
    </main>
  );
}

export default LoginPage;
