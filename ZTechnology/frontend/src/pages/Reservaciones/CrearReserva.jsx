import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from "../../css/Usuarios/CrearUsuario.module.css";

const CrearReserva = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    huesped_id: "",
    habitacion_id: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [huespedes, setHuespedes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    async function fetchHuespedes() {
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
        console.error("Error al obtener información de las habitaciones:", error);
      }
    }

    async function fetchHabitaciones() {
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
    }

    fetchHuespedes();
    fetchHabitaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/crear/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Reserva creada exitosamente");
      } else {
        const responseData = await response.json();
        console.error("Error al crear la reserva:", responseData.error);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h1>Crear Reserva</h1>
      <Link to="/dashboard/reservas">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información de la Reserva</h2>
          <div className={styles.formGroup}>
            <label>
              Huésped
              <select
                name="huesped_id"
                value={formData.huesped_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Seleccione un huésped</option>
                {huespedes.map((huesped) => (
                  <option key={huesped.id} value={huesped.id}>
                    {huesped.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Habitación
              <select
                name="habitacion_id"
                value={formData.habitacion_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Seleccione una habitación</option>
                {habitaciones.map((habitacion) => (
                  <option key={habitacion.numero} value={habitacion.numero}>
                    Numero: {habitacion.numero} - {habitacion.nivel}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha de Inicio
              <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Fecha de Fin
              <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>Crear Reserva</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReserva;
