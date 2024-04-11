import pool from "../config/db.js";

const obtenerHabitaciones = async (req, res) => {
  try {
    if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
        return res.status(403).json({ error: "Acceso denegado." });
    } 
    // Obtener todas las habitaciones
    const resultHabitaciones = await pool.query("SELECT * FROM habitaciones");
    const habitaciones = resultHabitaciones.rows;

    // Obtener todas las reservas
    const resultReservas = await pool.query("SELECT * FROM reservas");
    const reservas = resultReservas.rows;

    // Función para verificar si una habitación está ocupada
    const estaHabitacionOcupada = (numero) => {
      return reservas.some((reserva) => reserva.habitacion_id === numero);
    };

    // Contar habitaciones desocupadas y ocupadas
    const habitacionesDesocupadas = habitaciones.filter(
      (habitacion) => !estaHabitacionOcupada(habitacion.numero)
    );
    const habitacionesOcupadas = habitaciones.filter((habitacion) =>
      estaHabitacionOcupada(habitacion.numero)
    );

    res.json({
      habitaciones,
      habitacionesDesocupadas: habitacionesDesocupadas.length,
      habitacionesOcupadas: habitacionesOcupadas.length,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const crearHabitacion = async (req, res, next) => {
  const { numero, tipo, nivel, precio } = req.body;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado." });
    }
    // Almacenar la habitación en la base de datos
    const result = await pool.query(
      "INSERT INTO habitaciones (numero, tipo, nivel, precio) VALUES ($1, $2, $3, $4)",
      [numero, tipo, nivel, precio]
    );

    res.json({ message: "Habitación creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

const obtenerHabitacion = async (req, res) => {
  const { numero } = req.params;

  try {
    if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
        return res.status(403).json({ error: "Acceso denegado." });
    } 
    const result = await pool.query(
      "SELECT * FROM habitaciones WHERE numero = $1",
      [numero]
    );

    if (result.rows.length > 0) {
      const habitacion = result.rows[0];
      res.json({ habitacion });
    } else {
      res.status(404).json({ mensaje: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarHabitacion = async (req, res) => {
  const { numero } = req.params;
  const { tipo, nivel } = req.body;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado." });
    }
    const result = await pool.query(
      "UPDATE habitaciones SET tipo = $1, nivel = $2 WHERE numero = $3 RETURNING *",
      [tipo, nivel, numero]
    );

    if (result.rows.length > 0) {
      const habitacionActualizada = result.rows[0];
      res.json({
        mensaje: "Habitación actualizada exitosamente",
        habitacion: habitacionActualizada,
      });
    } else {
      res.status(404).json({ mensaje: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarHabitacion = async (req, res) => {
  const { numero } = req.params;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado." });
    }
    const result = await pool.query(
      "DELETE FROM habitaciones WHERE numero = $1 RETURNING *",
      [numero]
    );

    if (result.rows.length > 0) {
      const habitacionEliminada = result.rows[0];
      res.json({
        mensaje: "Habitación eliminada exitosamente",
        habitacion: habitacionEliminada,
      });
    } else {
      res.status(404).json({ mensaje: "Habitación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  obtenerHabitaciones,
  crearHabitacion,
  obtenerHabitacion,
  actualizarHabitacion,
  eliminarHabitacion,
};
