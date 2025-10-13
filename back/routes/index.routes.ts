import Elysia from "elysia";
import login from "../controllers/auth/login.controllers";

const router = new Elysia({ prefix: "/api" })

router.post('/login', login);

export default router;