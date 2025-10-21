// Base URL del backend
export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.3:4000";

// Test endpoint
export const Test = new URL("/api/test", BaseURL);

// Auth endpoints
export const AuthUserURL = new URL("/api/login", BaseURL);
export const SignupUserURL = new URL("/api/signup", BaseURL);

// Topics endpoints
export const TopicsURL = new URL("/api/topics", BaseURL);

// Tasks endpoints
// Endpoint base para crear tareas (POST /api/tasks)
export const TasksURL = new URL("/api/tasks", BaseURL);

// Endpoint para obtener tareas de un topic (GET /api/tasks/:topicId)
// Los hooks construirán la URL completa agregando el topicId dinámicamente
export const TasksBaseURL = "/api/tasks";
