import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './pages/registro';
import Home from './pages/home';
import RR from './pages/rr';
import RegistroP from './pages/RegistroP';
import Inicio from './pages/Inicio';
import RegistroMultas from './pages/RegistroM';
import PermisosPo from './pages/PermisosPo';
import Admin from './pages/admin';
import Contrasena from './pages/contrasena';
import RecuperarContra from './pages/recuperarcontrasena';
import './index.css';

function AppRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rr" element={<RR />} />
        <Route path="/contrasena" element={<Contrasena />} />
        <Route path="/registrop" element={<RegistroP />} />
        <Route path="/registrom" element={<RegistroMultas />} />
        <Route path="/permisospo" element={<PermisosPo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recuperarcontrasena" element={<RecuperarContra />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
