import { Link } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
    // Obtener el estado de autenticación del contexto
    const { auth, cargando } = useAuth();
  
    if (cargando) return "cargando...";

    // Verificar el rol del usuario
  const esAdmin = auth?.rol === 'admin';
  const esRecepcionista = auth?.rol === 'recepcionista';
  const esContador = auth?.rol === 'contador';
  //const esRecepcionista = auth.rol === 'recepcionista';

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.menu}>
        <Link to="/dashboard" className={styles.link}>
          <i className={`${styles.icon} fas fa-house`}></i>
          <span className={styles.textBase}>
            Inicio
          </span>
        </Link>

  {esAdmin && (
          <Link to="/dashboard/usuarios" className={styles.link}>
            <i className={`${styles.icon} fa-solid fa-users-gear`}></i>
            <span className={styles.textBase}>
              Usuarios
            </span>
          </Link>
        )}

{(esAdmin || esRecepcionista)  && (
        <Link to="/dashboard/habitaciones" className={styles.link}>
          <i className={`${styles.icon} fa-solid fa-bed`}></i>
          <span className={styles.textBase}>
            Habitaciones
          </span>
        </Link>
                )}

{(esAdmin || esRecepcionista) && (
        <Link to="/dashboard/huespedes" className={styles.link}>
          <i className={`${styles.icon} fas fa-users`}></i>
          <span className={styles.textBase}>
            Huespedes
          </span>
        </Link>
        )}

{(esAdmin || esRecepcionista) && (
        <Link to="/dashboard/reservas" className={styles.link}>
          <i className={`${styles.icon} fa-solid fa-check-to-slot`}></i>
          <span className={styles.textBase}>
            Reservaciones
          </span>
        </Link>
        )}

{(esAdmin || esContador) && (
        <Link to="/dashboard/contabilidad" className={styles.link}>
          <i className={`${styles.icon} fa-solid fa-file-invoice-dollar`}></i>
          <span className={styles.textBase}>
            Contabilidad
          </span>
        </Link>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
