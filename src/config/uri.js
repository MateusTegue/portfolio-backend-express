import dotenv from "dotenv";
dotenv.config();

// llamamos la conexion que tenemos en el .evn
export const MONGODB_URI = process.env.MONGODB_URL ;