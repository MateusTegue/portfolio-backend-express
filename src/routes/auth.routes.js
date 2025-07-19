import { Router } from "express";
import { crearUser} from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js"
import { createsuperuserSchema } from "../schemas/auth.schema.js";
import { LoginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();


// rutas para el login
router.post("/api/register", validateSchema(createsuperuserSchema), crearUser);


// ruta para el login
router.post("/api/login", validateSchema(LoginSchema), login);

export default router;