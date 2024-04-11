import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from "../../css/Usuarios/EdiarUsuario.module.css";

const EditarHuesped = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/huesped/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const huespedData = await response.json();
          setFormData({
            nombre: huespedData.huesped.nombre || "",
            apellido: huespedData.huesped.apellido || "",
            telefono: huespedData.huesped.telefono || "",
            correo: huespedData.huesped.correo || "",
          });
        } else {
          console.error("Error al obtener la información del huésped");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/actualizar/huesped/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Huésped actualizado exitosamente");
      } else {
        console.error("Error al actualizar el huésped");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h1>Editar Huésped</h1>
      <Link to="/dashboard/huespedes">
        <button className={styles.volverBoton}>Volver</button>
      </Link>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información del Huésped</h2>
          <div className={styles.formGroup}>
            <label>
              Nombre
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Apellido
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Teléfono
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo
              <input
                type="text"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.ContainerButton}>
            <button type="submit" className={styles.submitButton}>Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarHuesped;
