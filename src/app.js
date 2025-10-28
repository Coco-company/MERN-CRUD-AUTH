import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';   //01:20:30

const app = express(); 

app.use(morgan("dev"));
app.use(express.json()); //permite leer json en el entorno Express
app.use(cookieParser()); //01:11:40 parsea la cookie como json en consola (Formato orig "token=...")

app.use("/api", authRoutes); //El primer parametro agrega "/api" al inicio de la ruta
app.use("/api", taskRoutes);  //01:20:30

export default app;