import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cerrar() {
  const navigate = useNavigate();
  const numero = localStorage.getItem('numero') || ''; 

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(`https://apiss-81oo.onrender.com/api/verificar/${numero}`);
        const data = await response.json();
        if (!response.ok || data.message === 'Token no encontrado, redirigir al login') {
          alert('Token no encontrado, cerrando sesión');
          navigate('/');
        }
      } catch (error) {
        alert('Token no encontrado, cerrando sesión');
        navigate('/');
      }
    };

    const interval = setInterval(checkToken, 5000);
    return () => clearInterval(interval);
  }, [navigate, numero]);

  return null; 
}

export default Cerrar;
