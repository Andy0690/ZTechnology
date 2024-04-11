import express from 'express';
import { obtenerHabitaciones, crearHabitacion, obtenerHabitacion, actualizarHabitacion, eliminarHabitacion } from '../controllers/habitacionesController.js';
import checkAuth from '../middleware/authMiddleware.js';

const habitacionesRoutes = express.Router();

// Ruta para obtener todas las habitaciones
habitacionesRoutes.get('/habitaciones', checkAuth, obtenerHabitaciones);

// Ruta para crear una nueva habitación
habitacionesRoutes.post('/crear/habitacion', checkAuth, crearHabitacion);

// Ruta para obtener una habitación por ID
habitacionesRoutes.get('/habitacion/:numero', checkAuth, obtenerHabitacion);

// Ruta para actualizar una habitación
habitacionesRoutes.put('/actualizar/habitacion/:numero', checkAuth, actualizarHabitacion);

// Ruta para eliminar una habitación
habitacionesRoutes.delete('/eliminar/habitacion/:numero', checkAuth, eliminarHabitacion);

export default habitacionesRoutes;
