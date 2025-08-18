import mongoose from "mongoose";
import blog from "../../models/blog.js";

const getAllBlog  = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los blogs", error });
    }
}

export default getAllBlog