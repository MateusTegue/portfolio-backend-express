import Usuario from "../models/user.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js"; // Asegúrate de importar bien esta función

export const crearUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validamos que el usuario no esté registrado
    const userFound = await Usuario.findOne({ email });
    if (userFound) {
      return res.status(400).json({ msg: "El usuario ya existe en el sistema" });
    }

    // Encriptamos la contraseña
    const salt = await bcryptjs.genSalt(10); // Usamos 10 como número recomendado
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Creamos el usuario
    const nuevoUser = new Usuario({ email, password: hashedPassword, role });
    const usuarioGuardado = await nuevoUser.save();

    // Generamos el token
    const token = await createAccessToken({ id: usuarioGuardado._id });

    // Configuramos la cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "producción", // Solo en producción
      sameSite: "none",
    });

    // Enviamos la respuesta con los datos del usuario
    res.json({
      id: usuarioGuardado._id,
      email: usuarioGuardado.email,
      role: usuarioGuardado.role,
    });

  } catch (error) {
    console.error(error); // Para ver el error en la consola
    return res.status(500).json({ msg: "Error al crear usuario" });
  }
};


// implementacion del login para el usuario que ha sido creado

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // buscamos el email para sabe si esta registrado en el sistema 
    const userFound = await Usuario.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ msg: "El usuario no existe en el sistema"
        });
    }

    // verificamos la contraseña del user
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "La contraseña no es correcta"
        });
      }
    
    // creamos el token de autenticacion 
    const token = await createAccessToken({ id: userFound._id, email: userFound.email});

    res.cookie('token', token, {
      httpOnly:process.env.NODE_ENV === "desarrollo",
      secure: true,
      sameSite : "none"
      });

    res.json({
      id: userFound._id,
      email: userFound.email,
      token: token,
    })

  } catch (error) {
    console.error(error); // Para ver el error en la consola
  }
}


// verificamos el token de autenticacion del user

export const verifyToken = async (req, res) => {
  try {

    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ msg: "No hay token de autenticacion"
        });
    }
    
    jwt.verify (token, SECRET_KEY, async (error, usuario ) => {
      if (error) return res.status(400).json({ msg: "Token de autenticacion invalido" });
      
      const userFound = await Usuario.findById(Usuario.id);
      if (!userFound) return res.status(400).json({ msg: "El usuario no existe en el sistema" });

      return res.json({
        id: userFound._id,
        email: userFound.email,
        })
    })


  } catch (error) {
    console.error(error); // Para ver el error en la consola
  }
}