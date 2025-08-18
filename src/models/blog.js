// this module is used to define the blog model
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    imagen: { data: Buffer, contentType: String},
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaPublicacion: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

export default mongoose.model("Blog", BlogSchema);

