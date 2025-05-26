import mongoose from "mongoose";
import { MONGODB_URI } from "../config/uri.js";

export const conectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a la base de datos");
        } catch (error) {
            console.log("Error al conectar a la base de datos");
            process.exit(1);
        }
}