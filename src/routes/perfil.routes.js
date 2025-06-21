import { Router } from "express";
import { crearPerfil } from "../controllers/perfil.controller.js";
import { consultarPerfil} from "../controllers/perfil.controller.js"
import { consultarPerfilPublic} from "../controllers/perfil.controller.js"
import { actualizarPerfil } from "../controllers/perfil.controller.js"
import { eliminarPerfil } from "../controllers/perfil.controller.js"
import { crearPerfilSchemas } from "../schemas/perfil.schema.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import upload from "../middlewares/upload.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/api/perfil", upload.single("imagen"),validateSchema(crearPerfilSchemas) ,crearPerfil);

router.get("/api/perfil/public", consultarPerfilPublic);


router.get("/api/perfil", authMiddleware , consultarPerfil);


router.put("/api/perfil/:id",validateSchema(crearPerfilSchemas) ,actualizarPerfil);

router.delete("/api/perfil/:id", eliminarPerfil);

export default router;
