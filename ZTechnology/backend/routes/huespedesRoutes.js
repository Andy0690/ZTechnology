import express from 'express';
import { obtenerHuespedes, crearHuesped, obtenerHuesped, actualizarHuesped, eliminarHuesped } from '../controllers/huespedesController.js'
import checkAuth from '../middleware/authMiddleware.js';

const huespedesRoutes = express.Router();

// Ruta para obtener todos los usuarios
huespedesRoutes.get('/huespedes', checkAuth, obtenerHuespedes);

// Ruta para crear un nuevo usuario
huespedesRoutes.post('/registrar/huesped', checkAuth, crearHuesped);

// Ruta para obtener un usuario por ID
huespedesRoutes.get('/huesped/:id', checkAuth, obtenerHuesped);

// Ruta para actualizar un usuario
huespedesRoutes.put('/actualizar/huesped/:id', checkAuth, actualizarHuesped);

// Ruta para eliminar un usuario
huespedesRoutes.delete('/eliminar/huesped/:id', checkAuth, eliminarHuesped);

export default huespedesRoutes;