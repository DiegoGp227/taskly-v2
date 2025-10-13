"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/src/schemas/auth";
import { LuSendHorizontal } from "react-icons/lu";

interface FormLoginProps {
  onSubmit: (data: LoginInput) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function FormLogin({ onSubmit, isLoading, error }: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      className="flex flex-col items-center gap-4 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Email"
          className={`input ${errors.usernameOrEmail ? "border-red-500" : ""}`}
          {...register("usernameOrEmail")}
        />
        {errors.usernameOrEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.usernameOrEmail.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          placeholder="Password"
          className={`input ${errors.password ? "border-red-500" : ""}`}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
      
        className="button flex items-center justify-center gap-2"
        type="submit"
        disabled={isSubmitting}
      >
        <span>Send</span>
        <LuSendHorizontal size={20} />
      </button>
    </form>
  );
}
