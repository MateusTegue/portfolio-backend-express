import mongoose from "mongoose";

const ProyectoSchema = new mongoose.Schema({
    imagen : { data : Buffer, contentType: String },
    titulo : { type: String, required: true },
    descripcion : { type: String, required: true },
    fecha : { type: Date, required: true },
    url : { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
})



export default mongoose.model("Proyecto", ProyectoSchema);  //exportamos el modelo para poder usarlo