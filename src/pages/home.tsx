import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import icono from '../assets/icono.jpg';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import { SetStateAction } from 'react';

// Definir el tipo de notificación
interface Notificacion {
  id: string;
  mensaje: string;
}

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [userRole, setUserRole] = useState(''); // Estado para el rol
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);  // Especificamos el tipo
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("📌 Token de autenticación:", token);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    if (!usuario || !usuario.departamento) {
        navigate('/home'); // Redirigir al login si no hay usuario
        return;
    }

    setUserRole(usuario.rol); // Establecer el rol del usuario
    fetchNotificaciones(usuario.departamento); // Obtener notificaciones por departamento

    const interval = setInterval(() => {
        fetchNotificaciones(usuario.departamento);
    }, 5000);

    return () => clearInterval(interval);
}, [navigate]);

  const fetchNotificaciones = async (departamento: string) => {
    try {
        console.log('Fetching notifications for departamento:', departamento);
        const response = await axios.get(`https://apiss-81oo.onrender.com/api/notificaciones/${departamento}`);
        console.log('Notifications fetched:', response.data);

        if (Array.isArray(response.data.notificaciones)) {
            setNotificaciones(response.data.notificaciones);
        } else {
            console.error('Las notificaciones no son un arreglo:', response.data);
        }
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
    }
};

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = (profile: SetStateAction<string>) => {
    setSelectedProfile(profile);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 bg-white font-sans relative">
      {/* Icono de perfil y botón de registro */}
      <div className="absolute top-3 right-3 flex items-center space-x-3">
        <button 
          className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-pink-600 transition-transform hover:scale-105"
          onClick={() => navigate('/registro')}
        >
          Regístrate
        </button>
        <img 
          src={icono} 
          alt="Icono de Perfil" 
          className="w-12 h-12 rounded-full cursor-pointer" 
          onClick={handleMenuToggle}
        />
        
      </div>

      {/* Barra lateral */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-pink-500 text-white p-5 shadow-lg flex flex-col">
          <ul className="space-y-3">
            <li className="cursor-pointer hover:bg-pink-600 p-2" onClick={() => handleProfileSelection('Dueño')}>Dueño</li>
            <li className="cursor-pointer hover:bg-pink-600 p-2" onClick={() => handleProfileSelection('Administrador')}>Administrador</li>
            <li className="cursor-pointer hover:bg-pink-600 p-2" onClick={() => handleProfileSelection('Administración')}>Administración</li>
          </ul>
          <div className="mt-4 text-lg">Perfil seleccionado: {selectedProfile}</div>
        </div>
      )}

      {/* Título */}
      <h1 className="text-4xl font-black text-black uppercase tracking-wide text-center drop-shadow-lg">¡Vive la experiencia!</h1>

      {/* Mostrar el rol del usuario */}
      <div className="mt-4 text-xl">
        <p>Rol del usuario: {userRole}</p> {/* Mostrar el rol */}
      </div>

      {/* Contenedor de imágenes */}
      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {[img1, img2, img3].map((img, index) => (
          <div key={index} className="w-80 bg-white border-4 border-pink-500 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
            <img src={img} alt="Punta de Mita" className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-800">Punta de Mita, México</p>
              <p className="text-gray-600">11 - 16 Ene</p>
              <p className="text-pink-600 font-bold">$ 50,000 MEX por noche</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mostrar notificaciones */}
      <div className="notificaciones-container">
    <h2>Notificaciones</h2>
    {notificaciones.map((notificacion) => (
        <div key={notificacion.id} className="notificacion-item">
            {notificacion.mensaje}
        </div>
    ))}
</div>


      {/* Botón que redirige a rr.tsx */}
      <button 
        className="bg-pink-500 text-white text-lg font-bold py-3 px-6 rounded-full shadow-md transition-transform hover:scale-105 hover:bg-pink-600"
        onClick={() => navigate('/rr')} // Redirige a rr.tsx
      >
        Permisos y registros
      </button>

      {/* Círculos en forma de triángulo (dos abajo y uno arriba) en la parte superior */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        {/* Círculo superior */}
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>

        {/* Dos círculos inferiores */}
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
