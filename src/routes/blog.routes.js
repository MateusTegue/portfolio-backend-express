import { Router } from "express";
import createBlogController  from "../controllers/blog/create.blog.controller.js";
import getAllBlogController from "../controllers/blog/getAll.blog.controller.js"; 
import updateBlogController from "../controllers/blog/update.blog.controller.js";
import deleteBlogController from "../controllers/blog/delete.blog.controller.js";


const router = Router();

router.post("/api/blog", createBlogController);
router.get("/api/blog", getAllBlogController);
router.put("/api/blog/:id", updateBlogController);
router.delete("/api/blog/:id", deleteBlogController);


export default router;