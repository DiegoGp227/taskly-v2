import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { router } from "../routes/index.routes";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5000",
        "https://tasklyapp-v2.duckdns.org",
      ],
      credentials: true,
    })
  )
  .use(router)
  .get("/ping", () => "pong") 
  .all("*", () => ({
    message: "Ruta no encontrada",
  }))
  .listen(PORT);

console.log(`🔥 Hello world, I am listening on port ${PORT}`);