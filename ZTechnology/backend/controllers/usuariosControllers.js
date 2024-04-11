import pool from "../config/db.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";
const saltRounds = 10;

const obtenerUsuarios = async (req, res) => {
  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    const result = await pool.query("SELECT * FROM users");
    const user = result.rows;

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
};

const crearUsuario = async (req, res, next) => {
  const { first_name, last_name, phone, email, rol, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  // Insertar los datos en la tabla 'users' y obtener el ID del usuario recién insertado
  const userSql = `INSERT INTO users (email, password) VALUES ('${email}','${passwordHash}') RETURNING id`;
  pool.query(userSql, (error, userResult) => {
      if (error) {
          return res.json(error);
      } else {
          // Obtener el ID del usuario recién insertado
          const userId = userResult.rows[0].id;
          console.log(userId);
          // Insertar los detalles adicionales en la tabla 'user_details' utilizando el ID del usuario
          const userDetailsSql = `INSERT INTO user_details (user_id, first_name, last_name, phone, rol_id) VALUES (${userId}, '${first_name}', '${last_name}', '${phone}', '${rol}')`;
          pool.query(userDetailsSql, (error) => {
              if (error) {
                  return res.json(error);
              } else {
                  res.json({ status: 200, message: 'USER_CREATE_SUCCESSFULLY' });
              }
          });
      }
  });
};

const perfil = async (req, res) => {
  const { usuario } = req;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    const result = await pool.query(
      "SELECT nombre, apellido, telefono, cedula, rol FROM usuarios WHERE cedula = $1",
      [usuario.cedula]
    );

    if (result.rows.length > 0) {
      const perfilUsuario = result.rows[0];
      res.json(perfilUsuario);
    } else {
      res.status(404).json({ mensaje: "Perfil no encontrado para el usuario" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el perfil del usuario." });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ user });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const actualizarUsuario = async (req, res) => {
  const { cedula } = req.params;
  const { nombre, apellido, password, telefono, correo, rol } = req.body;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado." });
    }
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, apellido = $2, password = $3, telefono = $4, correo = $5, rol = $6 WHERE cedula = $7 RETURNING *",
      [nombre, apellido, password, telefono, correo, rol, cedula]
    );

    if (result.rows.length > 0) {
      const usuarioActualizado = result.rows[0];
      res.json({
        mensaje: "Usuario actualizado exitosamente",
        usuario: usuarioActualizado,
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarUsuario = async (req, res) => {
  const { cedula } = req.params;

  try {
    // Verificar si el usuario tiene el rol adecuado para esta acción
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res.status(404).json({ error: "Acceso denegado." });
    }
    const result = await pool.query(
      "DELETE FROM usuarios WHERE cedula = $1 RETURNING *",
      [cedula]
    );

    if (result.rows.length > 0) {
      const usuarioEliminado = result.rows[0];
      res.json({
        mensaje: "Usuario eliminado exitosamente",
        usuario: usuarioEliminado,
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar las credenciales
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const usuario = result.rows[0];

      // Comparar la contraseña hasheada almacenada con la proporcionada
      const match = await bcrypt.compare(password, usuario.password);
      console.log();
      if (match) {
        // Generar un token de acceso
        usuario.token = generarJWT(usuario.id);
        res.json(usuario);
      } else {
        const error = new Error("El Password es incorrecto");
        return res.status(403).json({ msg: error.message });
      }
    } else {
      const error = new Error("El Usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerUsuarios,
  perfil,
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  Login,
};
