import { Router } from "express";
import { crearProyecto } from "../controllers/proyecto.controller.js";
import { ontenerProyectos } from "../controllers/proyecto.controller.js";
import { obtenerProyectoPorId } from "../controllers/proyecto.controller.js";
import { eliminarProyectoPorId } from "../controllers/proyecto.controller.js";
import { actualizarProyecto } from "../controllers/proyecto.controller.js";


const router = Router()


router.post("/api/proyecto", crearProyecto);

router.get("/api/proyecto", ontenerProyectos);

router.get("/api/proyecto/:id", obtenerProyectoPorId);

router.put("/api/proyecto/:id", actualizarProyecto);

router.delete("/api/proyecto/:id", eliminarProyectoPorId);







export default router;