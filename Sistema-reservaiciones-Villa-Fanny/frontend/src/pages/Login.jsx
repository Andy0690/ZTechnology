// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import axios from 'axios';
import styles from "../css/Login.module.css";
import logo from "../assets/Logo-login.png";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/login', { correo, password });
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
      <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.subtitle}>Inicio de sesión</h2>
        <div className={styles.mb4}>
          <label className={styles.inputLabel}>Correo</label>
          <input
            type="text"
            className={styles.inputField}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className={styles.mb4}>
          <label className={styles.inputLabel}>Contraseña</label>
          <input
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
