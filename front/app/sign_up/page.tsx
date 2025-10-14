"use client";

import { LoginInput } from "@/src/schemas/auth";
import useRegister from "@/src/auth/services/hooks/useRegister";
import { useRouter } from "next/navigation";
import FormSignUp from "@/src/auth/forms/auth/FormSignUp";
import useAuthUser from "@/src/auth/services/hooks/useAuthUser";

function LoginPage() {
  const { login: signUpUser, isLoading, error } = useAuthUser();

  const router = useRouter();
  const handleLogin = async (data: LoginInput) => {
    const response = await signUpUser(data);
    if (response) {
      console.log("Usuario registrado/logueado:", response);
      router.push("/page");
    } else {
      console.error("Error al registrar/loguear usuario:", error);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-[400px] flex flex-col items-center border-2 border-soft-gray justify-evenly rounded">
        <h1 className="text-white font-bold text-4xl">Sign Up</h1>
        <FormSignUp onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </div>
    </main>
  );
}

export default LoginPage;
