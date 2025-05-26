import { Router } from "express";
import { actualizarFormacion, crearFormacion, eliminarFormacion } from "../controllers/formacion.controller.js";
import { consultarFormaciones } from "../controllers/formacion.controller.js";
import { consultarFormacion } from "../controllers/formacion.controller.js";
const router = Router();


// faltan poner alguna validaciones para esta ruta, las cuale se deben de hacer el el schemas models
router.post("/api/formacion", crearFormacion);

router.get("/api/formacion", consultarFormaciones);

router.get("/api/formacion/:id", consultarFormacion);

router.put("/api/formacion/:id", actualizarFormacion);

router.delete("/api/formacion/:id", eliminarFormacion);



export default router;  //exportamos el router para poder usarlo en otros archivos  //exportamos el