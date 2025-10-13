import Elysia from "elysia";
import login from "../controllers/auth/login.controllers";
import signup from "../controllers/auth/signup.controllers";
import dbCheck from "../controllers/test/test";

const router = new Elysia({ prefix: "/api" })

//auth 
router.post('/login', login);
router.post('/signup', signup);


//test
router.get('/back', () => 'Test route is working');
router.get('/db', dbCheck);



export default router;