"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuSendHorizontal } from "react-icons/lu";
import { TaskInput, taskSchema } from "@/src/schemas/home";

interface FormTaskProps {
  onSubmit: (data: TaskInput) => void;
  isLoading?: boolean;
  error?: string | null;
  isNew: boolean;
  initialData?: Partial<TaskInput>;
}

export default function FormTask({
  onSubmit,
  isLoading,
  error,
  isNew,
  initialData,
}: FormTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData,
  });

  return (
    <form
      className="flex flex-col items-center gap-4 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-white text-4xl">
        {isNew ? "New Task" : "Edit Task"}
      </h1>

      {/* Título */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Task Title"
          className={`input ${errors.title ? "border-red-500" : ""}`}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 mx-3">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Prioridad */}
      <div className="w-full">
        <label className="text-white text-sm mb-1 mx-3">Priority (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Priority"
          className={`input ${errors.priority ? "border-red-500" : ""}`}
          {...register("priority", { valueAsNumber: true })}
        />
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1 mx-3">
            {errors.priority.message}
          </p>
        )}
      </div>

      {/* Estado */}
      <div className="w-full">
        <label className="text-white text-sm mb-1 mx-3">Status</label>
        <select
          className={`input ${errors.status ? "border-red-500" : ""}`}
          {...register("status", { valueAsNumber: true })}
        >
          <option value={0}>To Do</option>
          <option value={1}>Complete</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1 mx-3">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Error general */}
      {error && <p className="text-red-500 text-sm mt-2 mx-3">{error}</p>}

      <button
        className="button flex items-center justify-center gap-2"
        type="submit"
        disabled={isSubmitting || isLoading}
      >
        <span>{isLoading ? "Loading..." : "Send"}</span>
        {!isLoading && <LuSendHorizontal size={20} />}
      </button>
    </form>
  );
}
