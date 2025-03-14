import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import Notis from './notu';
import axios from 'axios';

// Importación de imágenes
import registroPagosImg from '../assets/9.jpg';
import permisosPortonesImg from '../assets/7.jpg';
import iconoPerfil from '../assets/icono.jpg';
import Cerrar from './cerrar';


const RR = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const departamento = localStorage.getItem("departamento");
        if (!departamento) return;

        const response = await axios.get(`https://apiss-81oo.onrender.com/api/notificaciones/${departamento}`);
        const notificaciones = response.data.notificaciones || [];
        
        // Contar solo las no leídas
        const unread = notificaciones.filter((notif: any) => !notif.leido).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error obteniendo notificaciones:", error);
      }
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = (page: string) => {
    navigate(page);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white p-10 font-roboto relative">
      <Cerrar />
      {/* Círculos en la parte superior */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>

      {/* Icono de perfil, campana y botón de registro */}
      <div className="absolute top-3 right-3 flex items-center space-x-4">
        {/* Campana de notificaciones con contador */}
        <div className="relative">
          <FaBell 
            className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800 transition" 
            onClick={() => setShowNotificationModal(true)}
          />
          {/* Contador de notificaciones no leídas */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Botón de registro */}
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-pink-600 transition-transform hover:scale-105"
          onClick={() => navigate('/registro')}
        >
          Regístrate
        </button>

        {/* Icono de perfil */}
        <img 
          src={iconoPerfil} 
          alt="Icono de Perfil" 
          className="w-12 h-12 rounded-full cursor-pointer" 
          onClick={handleMenuToggle}
        />
      </div>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg p-4 w-48 rounded-lg z-50 border border-gray-300">
          <ul className="space-y-4 text-gray-700">
            <li onClick={() => handleProfileSelection('Dueño')} className="cursor-pointer hover:text-blue-500">Dueño</li>
            <li onClick={() => handleProfileSelection('Administrador')} className="cursor-pointer hover:text-blue-500">Administrador</li>
            <li onClick={() => handleProfileSelection('Administración')} className="cursor-pointer hover:text-blue-500">Administración</li>
          </ul>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Perfil seleccionado: <span className="font-semibold">{selectedProfile}</span></p>
          </div>
        </div>
      )}

      {/* Modal de notificaciones */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50">
          <div className="bg-white w-full max-w-md h-screen overflow-y-auto shadow-lg transform transition-transform duration-300">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Notificaciones</h2>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Componente de notificaciones */}
            <Notis />
          </div>
        </div>
      )}

      {/* Título principal */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center uppercase tracking-wide">
        Registros y Permisos
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="flex justify-center w-full gap-8 mt-8 flex-wrap">
        {/* Tarjeta 1 */}
        <div className="flex flex-col items-center w-full sm:w-1/3 min-w-[250px] mb-8">
          <p className="text-2xl font-semibold text-pink-700 mb-4 text-center">Registro de Pagos</p>
          <div 
            className="bg-white border-4 border-pink-700 rounded-lg p-6 text-center w-full shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onClick={() => handleRedirect('/registrop')}
          >
            <img src={registroPagosImg} alt="Registro de Pagos" className="w-full h-40 object-contain rounded-lg shadow-md" />
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="flex flex-col items-center w-full sm:w-1/3 min-w-[250px] mb-8">
          <p className="text-2xl font-semibold text-pink-700 mb-4 text-center">Permisos de Portones</p>
          <div 
            className="bg-white border-4 border-pink-700 rounded-lg p-6 text-center w-full shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onClick={() => handleRedirect('/permisospo')}
          >
            <img src={permisosPortonesImg} alt="Permisos de Portones" className="w-full h-40 object-contain rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RR;
