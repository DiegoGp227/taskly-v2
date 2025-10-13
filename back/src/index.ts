import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { router } from "../routes/index.routes";

const PORT = 3000;

const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://5db5-190-25-164-252.ngrok-free.app",
      ],
      credentials: true,
    })
  )
  .use(router)
  .get("/ping", () => "pong") 
  .all("*", () => ({
    message: "Escribe bien mono estupido",
  }))
  .listen(PORT);

console.log(`🔥 Hello world, I am listening on port ${PORT}`);
