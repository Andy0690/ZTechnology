import express from 'express';
import usuariosRoutes from './routes/usuariosRoutes.js';
import huespedesRoutes from './routes/huespedesRoutes.js';
import habitacionesRoutes from './routes/habitacionesRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware para permitir el análisis de JSON en las solicitudes
app.use(express.json());

// Rutas de usuario
app.use(usuariosRoutes);
app.use(huespedesRoutes);
app.use(habitacionesRoutes);
app.use(reservasRoutes);

// Middleware de error
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Puedes personalizar la respuesta de error según tus necesidades
  res.status(500).json({ error: 'Hubo un error en el servidor' });
};

app.use(errorHandler);





app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
