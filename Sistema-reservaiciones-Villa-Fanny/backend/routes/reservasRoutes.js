import express from 'express';
import { obtenerReservas, crearReserva, obtenerReserva, actualizarReserva, eliminarReserva } from '../controllers/reservasController.js';
import checkAuth from '../middleware/authMiddleware.js';

const reservasRoutes = express.Router();

// Ruta para obtener todas las reservas
reservasRoutes.get('/reservas', checkAuth, obtenerReservas);

// Ruta para crear una nueva reserva
reservasRoutes.post('/crear/reserva', checkAuth, crearReserva);

// Ruta para obtener una reserva por ID
reservasRoutes.get('/reserva/:id', checkAuth, obtenerReserva);

// Ruta para actualizar una reserva
reservasRoutes.put('/actualizar/reserva/:id', checkAuth, actualizarReserva);

// Ruta para eliminar una reserva
reservasRoutes.delete('/eliminar/reserva/:id', checkAuth, eliminarReserva);

export default reservasRoutes;
