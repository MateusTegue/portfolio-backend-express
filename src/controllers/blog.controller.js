import mongoose from "mongoose";
import Blog from "../models/blog.js";
import { uploadImageToDrive, deleteImageFromDrive } from "../services/googleDrive.service.js";

export const crearBlog = async (req, res) => {
  try {
    const { titulo, contenido, fecha, categoria, etiquetas, usuario } = req.body;
    
    // Procesar imagen si existe - subir a Google Drive
    let imagenData = null;
    if (req.file) {
      try {
        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const fileExtension = req.file.originalname.split('.').pop();
        const fileName = `blog_${timestamp}.${fileExtension}`;
        
        // Subir imagen a Google Drive
        const driveResult = await uploadImageToDrive(
          req.file.buffer,
          fileName,
          req.file.mimetype
        );
        
        imagenData = {
          fileId: driveResult.fileId,
          imageUrl: driveResult.imageUrl,
          fileName: driveResult.fileName,
        };
      } catch (driveError) {
        console.error('Error al subir imagen a Drive:', driveError);
        return res.status(500).json({ 
          msg: "Error al subir la imagen a Google Drive", 
          error: driveError.message 
        });
      }
    }

    // Procesar etiquetas
    let etiquetasArray = [];
    if (etiquetas) {
      try {
        // Intentar parsear como JSON primero
        const parsed = JSON.parse(etiquetas);
        etiquetasArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // Si no es JSON, tratar como string separado por comas
        etiquetasArray = typeof etiquetas === 'string' 
          ? etiquetas.split(',').map(tag => tag.trim()).filter(tag => tag)
          : Array.isArray(etiquetas) ? etiquetas : [];
      }
    }

    // Validar que `usuario` sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(usuario)) {
      return res.status(400).json({ msg: "ID de usuario no válido" });
    }

    // Convertir `usuario` a ObjectId antes de guardarlo en la base de datos
    const nuevoBlog = new Blog({
      titulo,
      contenido,
      fecha,
      categoria: categoria || "General",
      etiquetas: etiquetasArray,
      usuario: new mongoose.Types.ObjectId(usuario), // Conversión aquí
      imagen: imagenData,
    });

    await nuevoBlog.save();

    res.status(201).json({ msg: "Blog creado con éxito", Blog: nuevoBlog });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el blog", error });
  }
};

// obtener los blogs que se encuentran registrados en el sistema 
export const obtenerBlogs = async (req, res) => {
   try {
      const blogs = await Blog.find().populate('usuario', 'nombre email').sort({ fecha: -1 });

      if(!blogs) return res.status(404).json({msg: "Los blogs no han sido encontrados"});

      res.status(200).json(blogs)

   } catch (error){
      res.status(500).json({msg: "Error al obtener los blogs", error})
   }
}

// obtener un blog por id 
export const obtenerBlogPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const blog = await Blog.findById(id).populate('usuario', 'nombre email');
      if (!blog) {
         return res.status(404).json({ msg: "Blog no encontrado" });
      }
      res.status(200).json(blog);
      } catch (error) {
      res.status(500).json({ msg: "Error al obtener el blog", error });
    }
};

// actualizar blogs
export const actualizarBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, fecha, categoria, etiquetas } = req.body;
    
    // Obtener el blog actual
    const blogActual = await Blog.findById(id);
    if (!blogActual) {
      return res.status(404).json({ msg: "Blog no encontrado para actualizar" });
    }

    // Procesar etiquetas
    let etiquetasArray = [];
    if (etiquetas) {
      try {
        // Intentar parsear como JSON primero
        const parsed = typeof etiquetas === 'string' ? JSON.parse(etiquetas) : etiquetas;
        etiquetasArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // Si no es JSON, tratar como string separado por comas
        etiquetasArray = typeof etiquetas === 'string' 
          ? etiquetas.split(',').map(tag => tag.trim()).filter(tag => tag)
          : Array.isArray(etiquetas) ? etiquetas : [];
      }
    }
    
    const datosActualizados = {
      titulo,
      contenido,
      fecha,
      categoria: categoria || "General",
      etiquetas: etiquetasArray
    };

    // Si hay una nueva imagen, subirla a Drive
    if (req.file) {
      try {
        // Eliminar imagen anterior de Drive si existe
        if (blogActual.imagen && blogActual.imagen.fileId) {
          try {
            await deleteImageFromDrive(blogActual.imagen.fileId);
          } catch (driveError) {
            console.error('Error al eliminar imagen anterior de Drive:', driveError);
          }
        }

        // Generar nombre único para el archivo
        const timestamp = Date.now();
        const fileExtension = req.file.originalname.split('.').pop();
        const fileName = `blog_${timestamp}.${fileExtension}`;
        
        // Subir nueva imagen a Google Drive
        const driveResult = await uploadImageToDrive(
          req.file.buffer,
          fileName,
          req.file.mimetype
        );
        
        datosActualizados.imagen = {
          fileId: driveResult.fileId,
          imageUrl: driveResult.imageUrl,
          fileName: driveResult.fileName,
        };
      } catch (driveError) {
        console.error('Error al subir imagen a Drive:', driveError);
        return res.status(500).json({ 
          msg: "Error al subir la imagen a Google Drive", 
          error: driveError.message 
        });
      }
    }

    const blogActualizado = await Blog.findByIdAndUpdate(
      id, 
      datosActualizados, 
      { new: true }
    );
    
    res.status(200).json(blogActualizado);

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el blog", error });
  }
}

// eliminar blogs por id  
export const eliminarBlogPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      
      if (!blog) {
         return res.status(404).json({ msg: "Blog no encontrado para eliminar" });
      }

      // Eliminar imagen de Google Drive si existe
      if (blog.imagen && blog.imagen.fileId) {
        try {
          await deleteImageFromDrive(blog.imagen.fileId);
        } catch (driveError) {
          console.error('Error al eliminar imagen de Drive:', driveError);
          // Continuar con la eliminación del blog aunque falle la eliminación de la imagen
        }
      }

      await Blog.findByIdAndDelete(id);
      res.status(200).json({ msg: "Blog eliminado con éxito" });
   } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el blog", error });
    }
}

