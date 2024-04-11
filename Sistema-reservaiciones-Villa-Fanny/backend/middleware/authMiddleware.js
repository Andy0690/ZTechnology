import jwt from 'jsonwebtoken';
import pool from '../config/db.js'; // Asegúrate de importar tu conexión a la base de datos

const checkAuthUsuario = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca al usuario por su cédula (o algún otro identificador único) en la base de datos
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

      if (result.rows.length > 0) {
        req.usuario = result.rows[0];
        return next();
      } else {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({ msg: error.message });
      }
    } catch (error) {
      const e = new Error('Token no válido');
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error('Token no válido o inexistente');
    res.status(403).json({ msg: error.message });
  }


};

export default checkAuthUsuario;
