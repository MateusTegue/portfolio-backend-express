// validaciones para el documento perfil, en el cual estaremos verificando los campos que se van a insertar en el ref¿gistro

import { z } from "zod";

export const crearPerfilSchemas = z.object({
    nombre: z
        .string({ required_error: "El nombre es requerido" })
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres"),

    descripcion: z
        .string({ required_error: "La descripción es requerida" })
        .trim()
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(600, "La descripción no puede tener más de 600 caracteres"),
        
});



