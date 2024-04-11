
import { Link } from 'react-router-dom';
import styles from '../css/modules/Header.module.css'; // Asegúrate de usar la ruta correcta
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <h2>Villa Fanny</h2>
        </Link>

        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.logout}
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

