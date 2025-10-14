import { z } from "zod";

// Esquema para un topic
export const topicSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede tener más de 500 caracteres")
    .optional(), // Si quieres que sea opcional
});

// Tipo inferido
export type TopicInput = z.infer<typeof topicSchema>;
