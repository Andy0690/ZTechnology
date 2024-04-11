import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "../../css/Usuarios/CrearUsuario.module.css";

const CrearHabitacion = () => {
  const [formData, setFormData] = useState({
    numero: "",
    tipo: "",
    nivel: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/crear/habitacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Habitación creada exitosamente");
      } else {
        console.error("Error al crear la habitación");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h1>Registrar Habitación</h1>
      <Link to="/dashboard/habitaciones">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información de la Habitación</h2>
          <div className={styles.formGroup}>
            <label>
              Número
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Tipo
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Nivel
              <input
                type="text"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Precio
              <input
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearHabitacion;
