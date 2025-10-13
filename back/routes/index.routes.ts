import Elysia from "elysia";
import login from "../controllers/auth/login.controllers";
import dbCheck from "../controllers/test";
import signup from "../controllers/auth/signup.controllers";

const router = new Elysia({ prefix: "/api" })

router.post('/login', login);
router.post('/signup', signup);

router.get('/test', () => 'Test route is working');

router.get('/check', dbCheck);



export default router;