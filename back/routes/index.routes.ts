import { Elysia } from "elysia";
import login from "../controllers/auth/login.controllers";
import signup from "../controllers/auth/signup.controllers";
import dbCheck from "../controllers/test/test";
import { topics } from "../controllers/topics/topics.controller";
import { tasks } from "../controllers/tasks/tasks.controller";

export const router = new Elysia({ prefix: "/api" })
  // auth
  .post("/login", login)
  .post("/signup", signup)

  // topics
  .use(topics)

  // tasks
  .use(tasks)

  // test
  .get("/db", dbCheck)
  .get("/back", () => "Test route is working");
