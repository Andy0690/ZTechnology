import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/Usuarios/Usuarios.module.css";

const Huespedes = () => {
  const [huespedes, setHuespedes] = useState([]);
  const token = localStorage.getItem("token");

  const obtenerInfoHuespedes = async () => {
    try {
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch("http://localhost:5000/huespedes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.huespedes !== undefined) {
        setHuespedes(data.huespedes);
      }
    } catch (error) {
      console.error("Error al obtener información de los huéspedes:", error);
    }
  };

  useEffect(() => {
    obtenerInfoHuespedes();
  }, [token]);

  const eliminarHuesped = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/eliminar/huesped/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Huésped eliminado exitosamente");
        // Puedes recargar la lista de huéspedes después de eliminar uno
        obtenerInfoHuespedes();
      } else {
        console.error("Error al eliminar el huésped");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Huéspedes</h2>
      <div className={styles.headerButtons}>
        <Link to="/dashboard/registrar-huesped">
          <button className={styles.crearButton}>Crear Huésped</button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.usuariosTable}>
          <thead>
            <tr>
              <th className={styles.blueHeader}>Nombre</th>
              <th className={styles.blueHeader}>Apellido</th>
              <th className={styles.blueHeader}>Teléfono</th>
              <th className={styles.blueHeader}>Correo</th>
              <th className={styles.blueHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {huespedes.map((huesped, index) => (
              <tr
                key={huesped.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{huesped.nombre}</td>
                <td>{huesped.apellido}</td>
                <td>{huesped.telefono}</td>
                <td>{huesped.correo}</td>
                <td>
                  {/* Puedes agregar enlaces para editar o eliminar huéspedes aquí */}
                  <Link to={`/dashboard/editar-huesped/${huesped.id}`}>
                    <button className={styles.volverBoton}>Editar</button>
                  </Link>
                  <button
                    className={styles.volverBoton}
                    onClick={() => eliminarHuesped(huesped.id)}
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

export default Huespedes;
