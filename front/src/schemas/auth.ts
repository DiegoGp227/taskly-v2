import { z } from "zod";

// Validar que sea username (mínimo 3 letras/números) o email válido
const email = z
  .string()
  .min(3, "Debe tener al menos 3 caracteres")
  .refine(
    (value) =>
      /^[a-zA-Z0-9_]+$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    {
      message: "Debe ser un nombre de usuario válido o un correo electrónico",
    }
  );

// 🔹 Campos comunes (login base)
const credentialsSchema = z.object({
  email: email,
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// 🔹 Signup (extiende credenciales y agrega username y confirmación)
export const signupSchema = credentialsSchema
  .extend({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),
    confirmPassword: z.string().nonempty("Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// 🔹 Login (solo usa credenciales)
export const loginSchema = credentialsSchema;

// 🔹 Tipos inferidos
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
