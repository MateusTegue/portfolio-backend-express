import { Router } from "express";
import { crearProyecto } from "../controllers/proyecto.controller.js";
import { ontenerProyectos } from "../controllers/proyecto.controller.js";
import { obtenerProyectoPorId } from "../controllers/proyecto.controller.js";
import { eliminarProyectoPorId } from "../controllers/proyecto.controller.js";
import { actualizarProyecto } from "../controllers/proyecto.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router()

// ruta para obtener todos los proyectos de la base de datos 
// router.post("/api/proyecto", crearProyecto);
router.post("/api/proyecto", authMiddleware, upload.single("imagen"), crearProyecto);


router.get("/api/proyecto", ontenerProyectos);

router.get("/api/proyecto/:id", obtenerProyectoPorId);

router.put("/api/proyecto/:id", actualizarProyecto);

router.delete("/api/proyecto/:id", eliminarProyectoPorId);







export default router;