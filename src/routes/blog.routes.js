import { Router } from "express";
import { crearBlog, obtenerBlogs, obtenerBlogPorId, eliminarBlogPorId, actualizarBlog } from "../controllers/blog.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router()

// ruta para crear un blog (requiere autenticación)
router.post("/api/blog", authMiddleware, upload.single("imagen"), crearBlog);

// ruta para obtener todos los blogs de la base de datos 
router.get("/api/blog", obtenerBlogs);

// ruta para obtener un blog por id
router.get("/api/blog/:id", obtenerBlogPorId);

// ruta para actualizar un blog (con soporte para subir imagen)
router.put("/api/blog/:id", authMiddleware, upload.single("imagen"), actualizarBlog);

// ruta para eliminar un blog (requiere autenticación)
router.delete("/api/blog/:id", authMiddleware, eliminarBlogPorId);

export default router;

