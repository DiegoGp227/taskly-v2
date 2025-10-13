import { z } from "zod";

// Validar que sea username (mínimo 3 letras/números) o email válido
const usernameOrEmailSchema = z
  .string()
  .min(3, "Debe tener al menos 3 caracteres")
  .refine(
    (value) =>
      /^[a-zA-Z0-9_]+$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    {
      message: "Debe ser un nombre de usuario válido o un correo electrónico",
    }
  );

// 🔹 Campos comunes
const credentialsSchema = z.object({
  usernameOrEmail: usernameOrEmailSchema,
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// 🔹 Signup (extiende credenciales y agrega campos extra)
export const signupSchema = credentialsSchema
  .extend({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    confirmPassword: z.string().nonempty("Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Marca el error en confirmPassword
  });

// 🔹 Login (solo usa credenciales)
export const loginSchema = credentialsSchema;

// 🔹 Tipos inferidos
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
