import mongoose from "mongoose";

const FormacionSchema = new mongoose.Schema({

    imagen : { data : Buffer, contentType: String },
    titulo : { type: String, required: true },
    entidadEducativa : { type: String, required: true },
    descripcion : { type: String, required: true },
    fechaInicio : { type: Date },
    fechaFin : { type: Date, required: true },
    url : { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
})


export default mongoose.model("Formacion", FormacionSchema);  //exportamos el modelo para poder usarlo