import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Usuarios/Usuarios.module.css";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem("token");

  const obtenerInfoReservas = async () => {
    try {
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch("http://localhost:5000/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.reservas !== undefined) {
        setReservas(data.reservas);
      }
    } catch (error) {
      console.error("Error al obtener información de las reservas:", error);
    }
  };

  useEffect(() => {
    obtenerInfoReservas();
  }, [token]);

  const eliminarReserva = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/eliminar/reserva/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Reserva eliminada exitosamente");
        // Puedes recargar la lista de reservas después de eliminar una
        obtenerInfoReservas();
      } else {
        console.error("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Reservaciones</h2>
      <div className={styles.headerButtons}>
        <Link to="/dashboard/crear-reserva">
          <button className={styles.crearButton}>Crear Reserva</button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usuariosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Huesped</th>
              <th className={styles.blueHeader}>Habitación</th>
              <th className={styles.blueHeader}>Fecha Inicio</th>
              <th className={styles.blueHeader}>Fecha Fin</th>
              <th className={styles.blueHeader}>Cantidad Noches</th>
              <th className={styles.blueHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr
                key={reserva.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{`${reserva.huesped_nombre} ${reserva.huesped_apellido}`}</td>
                <td>{reserva.habitacion_id}</td>
                <td>{new Date(reserva.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(reserva.fecha_fin).toLocaleDateString()}</td>
                <td>{reserva.cantidad_noches}</td>
                <td>
                  <Link to={`/dashboard/editar-reserva/${reserva.id}`}>
                    <button className={styles.volverBoton}>Editar</button>
                  </Link>
                  <button
                    className={styles.volverBoton}
                    onClick={() => eliminarReserva(reserva.id)}
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

export default Reservas;
