import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
  
    if (cargando) return "cargando...";
  
    return (
      <>
        <Header />
        {auth?.cedula ? (
          <>

            <Sidebar />
            <Outlet />
          </>
        ) : 
          <Navigate to="/" /> }
      </>
    );
};

export default RutaProtegida;
