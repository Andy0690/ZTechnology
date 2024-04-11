import styles from "../css/modules/Alerta.module.css";

const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? styles.alerta_error : styles.alerta_check}`}>
            {alerta.msg}
        </div>
    )
};

export default Alerta;