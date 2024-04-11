import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RutaProtegida from "./layout/RutaProtegida";
import { AuthProvider } from "./context/AuthProvider";
import Huespedes from "./pages/Huespedes/Huespedes";
import CrearHuesped from "./pages/Huespedes/CrearHuesped";
import EditarHuesped from "./pages/Huespedes/EditarHuesped";
import Habitaciones from "./pages/Habitaciones/Habitaciones";
import CrearHabitacion from "./pages/Habitaciones/CrearHabitacion";
import EditarHabitacion from "./pages/Habitaciones/EditarHabitacion";
import Usuarios from "./pages/Usuarios/Usuarios";
import Reservas from "./pages/Reservaciones/Reservas";
import Contabilidad from "./pages/Contabilidad";
import Dashboard from "./pages/Dashboard";
import CrearUsuario from "./pages/Usuarios/CrearUsuario";
import EditarUsuario from "./pages/Usuarios/EditarUsuario";
import CrearReserva from "./pages/Reservaciones/CrearReserva";





function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<RutaProtegida />}>
          <Route index element={<Dashboard/>} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="crear-usuario" element={<CrearUsuario />} />
          <Route path="editar-usuario/:cedula" element={<EditarUsuario />} />
          <Route path="huespedes" element={<Huespedes />} />
          <Route path="registrar-huesped" element={<CrearHuesped />} />
          <Route path="editar-huesped/:id" element={<EditarHuesped />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="crear-reserva" element={<CrearReserva />} />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="crear-habitacion" element={<CrearHabitacion />} />
          <Route path="editar-habitacion/:numero" element={<EditarHabitacion />} />
          <Route path="contabilidad" element={<Contabilidad />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
