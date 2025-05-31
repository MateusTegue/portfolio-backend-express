import mongoose from "mongoose";
import Formacion from "../models/formacion.js";
import fs from "fs";

export const crearFormacion = async (req, res) => {
    try {

        const { imagen,  titulo , entidadEducativa,  descripcion , fechaInicio, fechaFin , usuario} = req.body;
        const imagenPath = req.file ? req.file.path : null; // Guarda la ruta de la imagen

        if(!mongoose.Types.ObjectId.isValid(usuario)){
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        const nuevaFormacion = new Formacion({
            imagen: imagenPath,
            titulo,
            entidadEducativa,
            descripcion,
            fechaInicio,
            fechaFin,
            usuario 
        });
        await nuevaFormacion.save();
        res.status(201).json({msg: "Formación creada con éxito",formacion: nuevaFormacion});

    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path); // Elimina el archivo si hay error
        res.status(500).json({msg: "Error al crear la formación", error});
    }
}


// consultar todas las formaciones que estan registrada en el sistema 
export const consultarFormaciones = async (req, res) => {
    try {

        const formaciones = await Formacion.find();
        res.status(200).json(formaciones);


    } catch (error) {
        res.status(500).json({msg: "Error al consultar las formaciones", error});
    }
}

// cinsultar formacion por id
export const consultarFormacion = async (req, res) => {
    try {

        const { id } = req.params;
        const formacion = await Formacion.findById(id);

        if(!formacion) return res.status(404).json({msg: "La formación no existe"});
        
        res.status(200).json(formacion);

    } catch (error) {
        res.status(500).json({msg: "Error al consultar la formación", error});
    }
}


// actualizar formacion
export const actualizarFormacion = async (req, res) => {
    try {

        const { id } = req.params;
        const { imagen, entidadEducativa, titulo, descripcion, fechaInicio, fechaFin } = req.body;
        
        const formacion = await Formacion.findByIdAndUpdate(
            id,
            { imagen, entidadEducativa, titulo, descripcion, fechaInicio, fechaFin },
            { new: true }
        );

        if(!formacion) return res.status(404).json({msg: "La formación no existe"});

        res.status(200).json(formacion);


    } catch (error) {
        res.status(500).json({msg: "Error al actualizar la formación", error});
    }
}


// eliminar formacion
export const eliminarFormacion = async (req, res) => {
    try {

        const { id } = req.params;
        const formacion = await Formacion.findByIdAndDelete(id);
        if(!formacion) return res.status(404).json({msg: "La formación no existe"});

        res.status(200).json({ msg: "La formación se eliminó correctamente"});

    } catch (error) {
        res.status(500).json({msg: "Error al eliminar la formación", error});
    }
} 