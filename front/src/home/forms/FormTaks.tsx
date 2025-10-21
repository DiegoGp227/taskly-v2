"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuSendHorizontal } from "react-icons/lu";
import { TopicInput, topicSchema } from "@/src/schemas/home";

interface FormTopicProps {
  onSubmit: (data: TopicInput) => void;
  isLoading?: boolean;
  error?: string | null;
  isNew: boolean;
}

export default function FormTaks({
  onSubmit,
  isLoading,
  error,
  isNew,
}: FormTopicProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TopicInput>({
    resolver: zodResolver(topicSchema),
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
          placeholder={isNew ? "Topic Title" : "task Title"}
          className={`input ${errors.title ? "border-red-500" : ""}`}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 mx-3">
            {errors.title.message}
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
