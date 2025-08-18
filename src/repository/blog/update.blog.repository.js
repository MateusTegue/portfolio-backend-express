import mongoose from "mongoose";
import blog from "../../models/blog.js";


const updateBlog = async (req , res ) => {
    try {
        const { id } = req.params;
        const { imagen, titulo, descripcion, fechaPublicacion } = req.body;

        const Blog = await blog.findByIdAndUpdate(
            id,
            { imagen, titulo, descripcion, fechaPublicacion },
            { new: true }
        );

        if (!Blog) {
            return res.status(404).json({ msg: "El blog no existe" });
        }

        res.status(200).json(Blog);
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el blog", error });
    }

}

export default updateBlog



