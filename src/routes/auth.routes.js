import { Router } from "express"; //traigo objeto router
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router(); 

router.post("/register", validateSchema(registerSchema), register); //

router.post("/login",validateSchema(loginSchema), login);   // 01:49:12

router.post("/logout", logout);

// Validar Token 01:03:20
//authRequired es un MIDDLEWARE tiene parametro NEXT por lo cual continua a "profile"
router.get("/profile", authRequired, profile);      //Toda ruta que querramos proteger podemos colocarle un "auth required"

export default router;