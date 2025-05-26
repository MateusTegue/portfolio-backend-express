import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'por favor ingrese un emailvalido' ],    
        },

        password : {
            type : String,
            required : true
            },

        role : {
            type : String,
            enum : ['admin', 'user'],
            required : true,
            default : 'admin'

            },
        perfil: { type: mongoose.Schema.Types.ObjectId, ref: 'Perfil' },
    });

export default mongoose.model("Usuario", UsuarioSchema);  //exporting the model


