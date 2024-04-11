import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Usuarios/Usuarios.module.css";

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const token = localStorage.getItem("token");

  const obtenerInfoHabitaciones = async () => {
    try {
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch("http://localhost:5000/habitaciones", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.habitaciones !== undefined) {
        setHabitaciones(data.habitaciones);
      }
    } catch (error) {
      console.error("Error al obtener información de las habitaciones:", error);
    }
  };

  useEffect(() => {
    obtenerInfoHabitaciones();
  }, [token]);

  const eliminarHabitacion = async (numero) => {
    try {
      const response = await fetch(`http://localhost:5000/eliminar/habitacion/${numero}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Habitación eliminada exitosamente");
        // Puedes recargar la lista de habitaciones después de eliminar una
        obtenerInfoHabitaciones();
      } else {
        console.error("Error al eliminar la habitación");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Habitaciones</h2>
      <div className={styles.headerButtons}>

        <Link to="/dashboard/crear-habitacion">
          <button className={styles.crearButton}>Crear Habitacion</button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usuariosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Número</th>
              <th className={styles.blueHeader}>Tipo</th>
              <th className={styles.blueHeader}>Nivel</th>
              <th className={styles.blueHeader}>Precio</th>
              <th className={styles.blueHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion, index) => (
              <tr
                key={habitacion.numero}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{habitacion.numero}</td>
                <td>{habitacion.tipo}</td>
                <td>{habitacion.nivel}</td>
                <td>{habitacion.precio}</td>
                <td>
                  {/* Puedes agregar enlaces para editar o eliminar habitaciones aquí */}
                  <Link to={`/dashboard/editar-habitacion/${habitacion.numero}`}>
                    <button className={styles.volverBoton}>Editar</button>
                  </Link>
                  <button
                    className={styles.volverBoton}
                    onClick={() => eliminarHabitacion(habitacion.numero)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Habitaciones;
