import express from 'express';
import { obtenerUsuarios, crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, Login, perfil } from '../controllers/usuariosControllers.js'
import checkAuth from '../middleware/authMiddleware.js';

const usuariosRoutes = express.Router();

// Ruta para obtener todos los usuarios
usuariosRoutes.get('/users', checkAuth, obtenerUsuarios);
// Ruta para crear un nuevo usuario
usuariosRoutes.post('/create/user', crearUsuario);
// Ruta para obtener un usuario por ID
usuariosRoutes.get('/user/:id', checkAuth, obtenerUsuario);
// Ruta para obtener un usuario
usuariosRoutes.get('/user', checkAuth, perfil);
// Ruta para actualizar un usuario
usuariosRoutes.put('/update/user/:id', checkAuth, actualizarUsuario);
// Ruta para eliminar un usuario
usuariosRoutes.delete('/delete/user/:id', checkAuth, eliminarUsuario);

// Ruta para el inicio de sesión
usuariosRoutes.post('/login', Login);

export default usuariosRoutes;
