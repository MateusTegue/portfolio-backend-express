import express from 'express';
import morgan from 'morgan';
import AuthRouter from './routes/auth.routes.js';
import PerfilRouter from './routes/perfil.routes.js';
import FormacionRouter from './routes/formacion.routes.js';
import ProyectoRouter from './routes/proyecto.routes.js';

const app = express();


app.use(morgan('dev'))
app.use(express.json())
app.use(AuthRouter);
app.use(PerfilRouter);
app.use(FormacionRouter);
app.use(ProyectoRouter);




export default app;