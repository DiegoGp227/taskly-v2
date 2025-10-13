import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import router from "../routes/index.routes"

const PORT = process.env.PORT || 3000;

// Configura el servidor
const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://5db5-190-25-164-252.ngrok-free.app",
      ],
      credentials: true,
    })
  )
  .use(router) 
  .all("*", () => ({
    message: "Escribe bien mono estupido",
  }))
  .listen(PORT);

console.log(`🔥 Hello world, I am listening on port ${PORT}`);
