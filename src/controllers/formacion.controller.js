import {
  crearFormacionService,
  obtenerTodasFormacionesService,
  obtenerFormacionService,
  actualizarFormacionService,
  eliminarFormacionService,
} from "../services/formacion.services.js";

export const crearFormacion = async (req, res) => {
  try {
    const formacion = await crearFormacionService(req.body, req.file);
    res.status(201).json({ msg: "Formación creada con éxito", formacion });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(error.status || 500).json({ msg: error.msg || "Error al crear la formación" });
  }
};

export const consultarFormaciones = async (req, res) => {
  try {
    const formaciones = await obtenerTodasFormacionesService();
    res.status(200).json(formaciones);
  } catch (error) {
    res.status(500).json({ msg: "Error al consultar las formaciones", error });
  }
};

export const consultarFormacion = async (req, res) => {
  try {
    const formacion = await obtenerFormacionService(req.params.id);
    res.status(200).json(formacion);
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg || "Error al consultar la formación" });
  }
};

export const actualizarFormacion = async (req, res) => {
  try {
    const formacion = await actualizarFormacionService(req.params.id, req.body);
    res.status(200).json(formacion);
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg || "Error al actualizar la formación" });
  }
};

export const eliminarFormacion = async (req, res) => {
  try {
    await eliminarFormacionService(req.params.id);
    res.status(200).json({ msg: "La formación se eliminó correctamente" });
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg || "Error al eliminar la formación" });
  }
};
