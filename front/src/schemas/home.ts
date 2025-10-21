import { z } from "zod";

export const topicSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede tener más de 500 caracteres")
    .optional(),
});

export type TopicInput = z.infer<typeof topicSchema>;

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(200, "El título no puede tener más de 200 caracteres"),
  priority: z
    .number()
    .min(1, "La prioridad debe ser al menos 1")
    .max(5, "La prioridad no puede ser mayor a 5")
    .optional(),
  status: z
    .number()
    .min(0, "El estado debe ser 0 o 1")
    .max(1, "El estado debe ser 0 o 1")
    .optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;
