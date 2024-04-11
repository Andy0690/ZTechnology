import{ useState, useEffect } from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [habitacionesDesocupadas, setHabitacionesDesocupadas] = useState(0);
  const [habitacionesOcupadas, setHabitacionesOcupadas] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Lógica para obtener la información de las habitaciones desde el backend
    const obtenerInfoHabitaciones = async () => {
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

        if (data.habitacionesDesocupadas !== undefined && data.habitacionesOcupadas !== undefined) {
          setHabitacionesDesocupadas(data.habitacionesDesocupadas);
          setHabitacionesOcupadas(data.habitacionesOcupadas);
        }
      } catch (error) {
        console.error("Error al obtener información de las habitaciones:", error);
      }
    };

    obtenerInfoHabitaciones();
  }, [token]);// Se ejecuta solo una vez al montar el componente

  return (
    <div className="content">
      <h2 className="pollo">Dashboard Page</h2>

      <div className="dashboard-cards">
        {/* Card 1: Cantidad de habitaciones disponibles */}
        <div className="card">
          <h3>Habitaciones Disponibles</h3>
          <p>{habitacionesDesocupadas}</p>
        </div>

        {/* Card 2: Cantidad de habitaciones ocupadas */}
        <div className="card">
          <h3>Habitaciones Ocupadas</h3>
          <p>{habitacionesOcupadas}</p>
        </div>

        {/* ... otras tarjetas */}
      </div>
    </div>
  );
};

export default Dashboard;
