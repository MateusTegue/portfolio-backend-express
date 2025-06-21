import mongoose from "mongoose";
import Perfil from "../models/perfil.js";
import fs from "fs"; // Para eliminar archivos en caso de error

export const crearPerfil = async (req, res) => {
  try {
    const { nombre, descripcion, usuario } = req.body;
    const imagenPath = req.file ? req.file.path : null; // Guarda la ruta de la imagen

    //  Validar que `usuario` sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(usuario)) {
      return res.status(400).json({ msg: "ID de usuario no válido" });
    }

    //  Convertir `usuario` a ObjectId antes de guardarlo en la base de datos
    const nuevoPerfil = new Perfil({
      nombre,
      descripcion,
      usuario: new mongoose.Types.ObjectId(usuario), // Conversión aquí
      imagen: imagenPath,
    });

    await nuevoPerfil.save();

    res.status(201).json({ msg: "Perfil creado con éxito", perfil: nuevoPerfil });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Elimina el archivo si hay error
    res.status(500).json({ msg: "Error al crear el perfil", error });
  }
};

// listar el perfil que se ha creado 
// export const colsultarPerfil = async (req, res) => {
//     try {

//       const perfil = await Perfil.find()
//       res.status(200).json(perfil);

//     } catch (error){
//        res.status(500).json({msg: "Error al obtener el perfil"})
//     }
// }

export const consultarPerfilPublic = async (req, res) => {
   try {

      const perfil = await Perfil.find()
      res.status(200).json(perfil);

    } catch (error){
       res.status(500).json({msg: "Error al obtener el perfil"})
    }
}  


export const consultarPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.findOne({ usuario: req.user.id })
          .populate('usuario', 'email role');

    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};



// actualizar la informacion del perfil 

export const actualizarPerfil = async (req, res) => {
    try {

      const { id } = req.params;
      const { imagen, nombre, descripcion } = req.body;
      const perfil = await Perfil.findByIdAndUpdate(
        id,
        { imagen, nombre, descripcion }, 
        { new: true 

      });

      if(!perfil) return res.status(404).json({msg: "Perfil no encontrado"})
      
      res.status(200).json(perfil);

    } catch (error){
      res.status(500).json({msg: "Error al actualizar el perfil"})
    }
}





// eliminar perfil del sistema
export const eliminarPerfil = async (req, res) => {
    try{

      const { id } = req.params;
      const perfil = await Perfil.findByIdAndDelete(id);

      if(!perfil) return res.status(404).json({msg: "El perfil no existe"})

      res.status(200).json({msg: "El perfil ha sido eliminado con exito"});

    } catch (error){
       res.status(500).json({msg: "Error al elminiar el Perfil"});
    }
}








