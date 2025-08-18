import mongoose from 'mongoose';
import blog from '../../models/blog.js';

const createBlog = async (req, res) => {
    try {
        const { imagen, titulo, descripcion, usuario } = req.body;
        const imagenPath = req.file ? req.file.path : null; // Guarda la ruta de la imagen

        if (!mongoose.Types.ObjectId.isValid(usuario)) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        const nuevoBlog = new blog({
            imagen: imagenPath,
            titulo,
            descripcion,
            usuario
        })
        await nuevoBlog.save();
        res.status(201).json({ msg: "Blog creado con éxito", blog: nuevoBlog });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path); // Elimina el archivo si hay error
        res.status(500).json({ msg: "Error al crear el blog", error });
    }
}

export default createBlog