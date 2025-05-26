import Formacion from "../models/formacion.js";

export const crearFormacionRepo = (data) => new Formacion(data).save();

export const obtenerTodasFormacionesRepo = () => Formacion.find();

export const obtenerFormacionPorIdRepo = (id) => Formacion.findById(id);

export const actualizarFormacionRepo = (id, data) =>
  Formacion.findByIdAndUpdate(id, data, { new: true });

export const eliminarFormacionRepo = (id) => Formacion.findByIdAndDelete(id);
