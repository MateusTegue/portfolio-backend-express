import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    // Imagen guardada en Google Drive
    imagen: {
        fileId: { type: String }, // ID del archivo en Google Drive
        imageUrl: { type: String }, // URL pública de la imagen
        fileName: { type: String }, // Nombre del archivo
        // Mantener compatibilidad con el formato anterior
        data: Buffer,
        contentType: String
    },
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, required: true },
    categoria: { type: String, default: "General" },
    etiquetas: [{ type: String }],
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default mongoose.model("Blog", BlogSchema);

