import pool from "../config/db.js";
import { calcularNumeroNoches } from "../helpers/calcularNoches.js";

const obtenerReservas = async (req, res) => {
    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        } 
        const result = await pool.query('SELECT * FROM reservas');
        const reservas = result.rows;

        // Obtener información de huésped y habitación
        const reservasConNombres = await Promise.all(reservas.map(async (reserva) => {
            const nombreResult = await pool.query('SELECT nombre FROM huespedes WHERE id = $1', [reserva.huesped_id]);
            const apellidoResult = await pool.query('SELECT apellido FROM huespedes WHERE id = $1', [reserva.huesped_id]);

            return {
                ...reserva,
                huesped_nombre: nombreResult.rows[0].nombre,
                huesped_apellido: apellidoResult.rows[0].apellido,
            };
        }));

        res.json({ reservas: reservasConNombres });
    } catch (error) {
        res.json({ error: error.message });
    }
}

const crearReserva = async (req, res, next) => {
    const { huesped_id, habitacion_id, fecha_inicio, fecha_fin } = req.body;

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        } 
        // Calcular automáticamente el número de noches usando la función de helpers
        const numero_noches = calcularNumeroNoches(fecha_inicio, fecha_fin);

        // Obtener el precio de la habitación desde la base de datos
        const resultPrecioHabitacion = await pool.query('SELECT precio FROM habitaciones WHERE numero = $1', [habitacion_id]);
        const precio_habitacion = resultPrecioHabitacion.rows[0].precio;

        // Calcular el ingreso total
        const ingreso_total = precio_habitacion * numero_noches;

        // Almacenar la reserva en la base de datos
        const resultReserva = await pool.query('INSERT INTO reservas (huesped_id, habitacion_id, fecha_inicio, fecha_fin, cantidad_noches) VALUES ($1, $2, $3, $4, $5) RETURNING id', [huesped_id, habitacion_id, fecha_inicio, fecha_fin, numero_noches]);
        
        // Obtener automáticamente la información del huésped desde la reserva
        const resultReservaInfo = await pool.query('SELECT * FROM reservas WHERE id = $1', [resultReserva.rows[0].id]);
        const huesped_reserva_id = resultReservaInfo.rows[0].huesped_id;

        // Registrar la transacción en la tabla de contabilidad con claves foráneas
        const resultContabilidad = await pool.query('INSERT INTO contabilidad (fecha, tipo, cantidad, habitacion_id, huesped_id) VALUES ($1, $2, $3, $4, $5)', [new Date(), 'ingreso', ingreso_total, habitacion_id, huesped_reserva_id]);

        res.json({ message: 'Reserva creada exitosamente' });
    } catch (error) {
        next(error);
    }
}


const obtenerReserva = async (req, res) => {
    const { id } = req.params;  

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        } 
        const result = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            const reserva = result.rows[0];
            res.json({ reserva });
        } else {
            res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const actualizarReserva = async (req, res) => {
    const { id } = req.params;  
    const { huesped_id, habitacion_id, fecha_inicio, fecha_fin, cantidad_noches } = req.body;

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        } 
        const result = await pool.query('UPDATE reservas SET huesped_id = $1, habitacion_id = $2, fecha_inicio = $3, fecha_fin = $4, cantidad_noches = $5 WHERE id = $6 RETURNING *', [huesped_id, habitacion_id, fecha_inicio, fecha_fin, cantidad_noches, id]);

        if (result.rows.length > 0) {
            const reservaActualizada = result.rows[0];
            res.json({ mensaje: 'Reserva actualizada exitosamente', reserva: reservaActualizada });
        } else {
            res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarReserva = async (req, res) => {
    const { id } = req.params;  

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        } 
        const result = await pool.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length > 0) {
            const reservaEliminada = result.rows[0];
            res.json({ mensaje: 'Reserva eliminada exitosamente', reserva: reservaEliminada });
        } else {
            res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    obtenerReservas,
    crearReserva,
    obtenerReserva,
    actualizarReserva,
    eliminarReserva
}
