import mongoose from "mongoose";


const PerfilSchema = new mongoose.Schema({
    imagen : { 
        data : Buffer,
        contentType: String
    },
    nombre: { 
        type: String,
        required: true
    },
    descripcion : { type: String,
        required: true
    },
    usuario : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },

})

export default mongoose.model('Perfil', PerfilSchema);  //exportamos el modelo para poder usarlo