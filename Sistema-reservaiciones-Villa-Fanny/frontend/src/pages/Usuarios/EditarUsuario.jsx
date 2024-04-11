import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import styles from "../../css/Usuarios/EdiarUsuario.module.css";

const EditarUsuario = () => {
  const { cedula } = useParams();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    password: "",
    cedula: "",
    correo: "",
    rol: "",
  });

  const [showPasswordHint, setShowPasswordHint] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/usuario/${cedula}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
            const userData = await response.json();
            setFormData({
              nombre: userData.usuario.nombre || "",
              apellido: userData.usuario.apellido || "",
              telefono: userData.usuario.telefono || "",
              password: "",  
              cedula: userData.usuario.cedula || "",
              correo: userData.usuario.correo || "",
              rol: userData.usuario.rol || "",
            });
          } else {
            console.error("Error al obtener la información del usuario");
          }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
  
    fetchData();
  }, [cedula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      // Crear un nuevo objeto formDataActualizado sin incluir el campo password si está vacío
      const formDataActualizado = { ...formData };
      if (formData.password === "") {
        delete formDataActualizado.password;
      }
  
      const response = await fetch(`http://localhost:5000/actualizar/usuario/${cedula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataActualizado),
      });
  
      if (response.ok) {
        alert("Usuario actualizado exitosamente");
      } else {
        console.error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  

  return (
    <div className={styles.content}>
      <h1>Editar Usuario</h1>
      <Link to="/dashboard/usuarios">
          <button className={styles.volverBoton}>Volver</button>
      </Link>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Información Personal</h2>
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
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </label>
            <label>
          Contraseña
          <div className={styles.passwordContainer}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div 
              className={`${styles.infoIcon} fa-solid fa-circle-exclamation`}
              onMouseEnter={() => setShowPasswordHint(true)}
              onMouseLeave={() => setShowPasswordHint(false)}
            >
            </div>
            {showPasswordHint && (
              <div className={styles.popUp}>
                Pon tu contraseña anterior si no quieres cambiarla
              </div>
            )}
          </div>
        </label>
            <label>
              Cédula
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <h2 className={styles.title}>Rol</h2>
<div className={styles.radioGroup}>
  <label>
    <input
      type="radio"
      name="rol"
      value="recepcionista"
      checked={formData.rol === "recepcionista"}
      onChange={handleChange}
      required
    />
    Recepcionista
  </label>
  <label>
    <input
      type="radio"
      name="rol"
      value="admin"
      checked={formData.rol === "admin"}
      onChange={handleChange}
      required
    />
    Admin
  </label>
  <label>
    <input
      type="radio"
      name="rol"
      value="contador"
      checked={formData.rol === "contador"}
      onChange={handleChange}
      required
    />
    Contador
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

export default EditarUsuario;
