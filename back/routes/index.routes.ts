import Elysia from "elysia";
import login from "../controllers/auth/login.controllers";
import dbCheck from "../controllers/test";

const router = new Elysia({ prefix: "/api" })

router.post('/login', login);
router.get('/test', () => 'Test route is working');

router.get('/check', dbCheck);



export default router;