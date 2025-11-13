"use client";

import useRegister from "@/src/auth/services/hooks/useRegister";
import { useRouter } from "next/navigation";
import FormSignUp from "@/src/auth/forms/auth/FormSignUp";
import { RegisterCredentials } from "@/src/auth/types/types";

export default function SignUpPage() {
  const { register: signUpUser, error } = useRegister();

  const router = useRouter();

  const handleSignUp = async (data: RegisterCredentials) => {
    console.log("Datos del formulario:", data);
    const response = await signUpUser(data);
    if (response) {
      console.log("Usuario registrado/logueado:", response);
      router.push("/");
    } else {
      console.error("Error al registrar/loguear usuario:", error);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-[550px] flex flex-col items-center border-2 border-soft-gray justify-evenly rounded">
        <h1 className="text-white font-bold text-4xl">Sign Up</h1>
        <FormSignUp onSubmit={handleSignUp}  />
      </div>
    </main>
  );
}
