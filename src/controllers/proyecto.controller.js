import mongoose from "mongoose";
import Proyecto from "../models/proyecto.js";
import fs from "fs"; // Para eliminar archivos en caso de error

export const crearProyecto = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, url, usuario } = req.body;
    const imagenPath = req.file ? req.file.path : null; // Guarda la ruta de la imagen

    //  Validar que `usuario` sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(usuario)) {
      return res.status(400).json({ msg: "ID de usuario no válido" });
    }

    //  Convertir `usuario` a ObjectId antes de guardarlo en la base de datos
    const nuevoProyecto = new Proyecto({
      titulo,
      descripcion,
      fecha,
      url,
      usuario: new mongoose.Types.ObjectId(usuario), // Conversión aquí
      imagen: imagenPath,
    });

    await nuevoProyecto.save();

    res.status(201).json({ msg: "Proyecto creado con éxito", Proyecto: nuevoProyecto });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Elimina el archivo si hay error
    res.status(500).json({ msg: "Error al crear el proyecto", error });
  }
};



// obtener los proyecto que se encuantra registrados en el sistema 
export const ontenerProyectos = async (req, res ) => {
   try {

      const proyectos = await Proyecto.find();

      if(!proyectos) return res.status(404).json({msg: "Los proyectos no han sido encontrados"});

      res.status(200).json(proyectos)

   } catch (error){
      res.status(500).json({msg: "Error al obtener los proyectos"})
   }
}

// obtener un proyecto por id 
export const obtenerProyectoPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const proyecto = await Proyecto.findById(id);
      if (!proyecto) {
         return res.status(404).json({ msg: "Proyecto no encontrado" });
      }
      res.status(200).json(proyecto);
      } catch (error) {
      res.status(500).json({ msg: "Error al obtener el proyecto", error });
    }
};

// actualizar proyectos
export const actualizarProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha , url, imagen } = req.body;
    const proyectoActualizado = await Proyecto.findByIdAndUpdate(
      id, { imagen, titulo, descripcion, fecha, url }, { new: true });
    
    if (!proyectoActualizado) {
      return res.status(404).json({ msg: "Proyecto no encontrado para actualizar" });
    }
    res.status(200).json(proyectoActualizado);

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el proyecto", error });
  }
}



// eliminar proyectos por id  
export const eliminarProyectoPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const proyecto = await Proyecto.findByIdAndDelete(id);
      if (!proyecto) {
         return res.status(404).json({ msg: "Proyecto no encontrado para eliminar" });
         }
      res.status(200).json({ msg: "Proyecto eliminado con éxito" });
   } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el proyecto", error });
    }
}
