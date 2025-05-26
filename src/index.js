import app from "./app.js";
import { PORT } from "./config/puerto.js";
import { conectDB } from "./database/conexiondb.js";



async function main(){
    try {
        await conectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectarse a la base de datos");
        }
}

main();