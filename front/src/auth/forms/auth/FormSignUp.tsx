"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/src/schemas/auth";
import { LuSendHorizontal } from "react-icons/lu";

interface FormSignUpProps {
  onSubmit: (data: SignupInput) => void;
}

export default function FormSignUp({
  onSubmit,

}: FormSignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form
      className="flex flex-col items-center gap-4 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="username"
          className={`input ${errors.username ? "border-red-500" : ""}`}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="email"
          placeholder="Email"
          className={`input ${errors.email ? "border-red-500" : ""}`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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

      <div className="w-full">
        <input
          type="password"
          placeholder="Confirm Password"
          className={`input ${errors.confirmPassword ? "border-red-500" : ""}`}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
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
