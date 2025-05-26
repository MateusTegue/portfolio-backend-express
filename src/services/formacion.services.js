import mongoose from "mongoose";
import fs from "fs";
import {
  crearFormacionRepo,
  obtenerTodasFormacionesRepo,
  obtenerFormacionPorIdRepo,
  actualizarFormacionRepo,
  eliminarFormacionRepo,
} from "../repository/formacion.repository.js";

export const crearFormacionService = async (body, file) => {
  const { titulo, entidadEducativa, descripcion, fechaInicio, fechaFin, usuario } = body;
  const imagenPath = file ? file.path : null;

  if (!mongoose.Types.ObjectId.isValid(usuario)) {
    if (file) fs.unlinkSync(file.path);
    throw { status: 400, msg: "El usuario no existe" };
  }

  const formacion = await crearFormacionRepo({
    imagen: imagenPath,
    titulo,
    entidadEducativa,
    descripcion,
    fechaInicio,
    fechaFin,
    usuario,
  });

  return formacion;
};

export const obtenerTodasFormacionesService = async () => {
  return await obtenerTodasFormacionesRepo();
};

export const obtenerFormacionService = async (id) => {
  const formacion = await obtenerFormacionPorIdRepo(id);
  if (!formacion) throw { status: 404, msg: "La formación no existe" };
  return formacion;
};

export const actualizarFormacionService = async (id, data) => {
  const formacion = await actualizarFormacionRepo(id, data);
  if (!formacion) throw { status: 404, msg: "La formación no existe" };
  return formacion;
};

export const eliminarFormacionService = async (id) => {
  const formacion = await eliminarFormacionRepo(id);
  if (!formacion) throw { status: 404, msg: "La formación no existe" };
  return formacion;
};
