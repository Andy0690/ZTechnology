import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "../../css/Usuarios/CrearUsuario.module.css";
import Alerta from "../../components/Alerta";

const CrearUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    password: "",
    cedula: "",
    correo: "",
    rol: "",
  });
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((formData.nombre, formData.apellido, formData.telefono, formData.cedula, formData.correo, formData.rol).trim() === "") {
      setAlerta({msg: "Hay campos vacios", error: true})
      return
    }
    if (formData.password.trim().length < 6) {
      setAlerta({msg: "La contraseña minimo 6 caracteres", error: true})
      return
    }

    setAlerta({})
  
    try {
      const token = localStorage.getItem("token"); // Reemplaza "tuToken" con el nombre correcto de tu token en localStorage
  
      const response = await fetch("http://localhost:5000/crear/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setAlerta({msg: "Usuario creado correctamente", error: false})
      } else {
        console.error("Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
    const {msg} = alerta

  return (
    <div className={styles.content}>
      <h1>Registrar Usuario</h1>
      <Link to="/dashboard/usuarios">
          <button className={styles.volverBoton}>Volver</button>
      </Link>
      {msg &&  < Alerta
        alerta={alerta}
      />}
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
                // required
              />
            </label>
            <label>
              Apellido
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                // required
              />
            </label>
            <label>
              Teléfono
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                // required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                // required
              />
            </label>
            <label>
              Cédula
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                // required
              />
            </label>
            <label>
              Correo
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                // required
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
                onChange={handleChange}
                // required
              />
              Recepcionista
            </label>
            <label>
              <input
                type="radio"
                name="rol"
                value="admin"
                onChange={handleChange}
                // required
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="rol"
                value="contador"
                onChange={handleChange}
                // required
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

export default CrearUsuario;
