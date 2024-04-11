import pool from "../config/db.js";

const obtenerHuespedes = async (req, res) => {
    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        }            
        const result = await pool.query('SELECT * FROM huespedes');
        const huespedes = result.rows;

        res.json({ huespedes });
    } catch (error) {
        res.json({ error: error.message });
    }
}

const crearHuesped = async (req, res, next) => {
    const { nombre, apellido, telefono, correo } = req.body;
    
    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        }     
        // Almacenar el huésped en la base de datos
        const result = await pool.query('INSERT INTO huespedes (nombre, apellido, telefono, correo) VALUES ($1, $2, $3, $4)', [nombre, apellido, telefono, correo]);
        
        res.json({ message: 'Huésped creado exitosamente' });
    } catch (error) {
        next(error);
    }
}

const obtenerHuesped = async (req, res) => {
    const { id } = req.params;  

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        }     
        const result = await pool.query('SELECT * FROM huespedes WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            const huesped = result.rows[0];
            res.json({ huesped });
        } else {
            res.status(404).json({ mensaje: 'Huésped no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const actualizarHuesped = async (req, res) => {
    const { id } = req.params;  
    const { nombre, apellido, telefono, correo } = req.body;

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        }     
        const result = await pool.query('UPDATE huespedes SET nombre = $1, apellido = $2, telefono = $3, correo = $4 WHERE id = $5 RETURNING *', [nombre, apellido, telefono, correo, id]);

        if (result.rows.length > 0) {
            const huespedActualizado = result.rows[0];
            res.json({ mensaje: 'Huésped actualizado exitosamente', huesped: huespedActualizado });
        } else {
            res.status(404).json({ mensaje: 'Huésped no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarHuesped = async (req, res) => {
    const { id } = req.params;  

    try {
        if (!req.usuario || (req.usuario.rol !== "admin" && req.usuario.rol !== "recepcionista")) {
            return res.status(403).json({ error: "Acceso denegado." });
        }     
        const result = await pool.query('DELETE FROM huespedes WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length > 0) {
            const huespedEliminado = result.rows[0];
            res.json({ mensaje: 'Huésped eliminado exitosamente', huesped: huespedEliminado });
        } else {
            res.status(404).json({ mensaje: 'Huésped no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    obtenerHuespedes,
    crearHuesped,
    obtenerHuesped,
    actualizarHuesped,
    eliminarHuesped
}
