import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importación de imágenes
import iconoPerfil from './assets/icono.jpg';
import imagenReservacion from './assets/3.jpg';

function Reservacion() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 relative">
      
      {/* Círculos en la parte superior */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        {/* Círculo superior */}
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>

        {/* Dos círculos inferiores */}
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>

      {/* Icono de perfil y botón de registro */}
      <div className="absolute top-3 right-3 flex items-center space-x-3">
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-pink-600 transition-transform hover:scale-105"
          onClick={() => navigate('/registro')}
        >
          Regístrate
        </button>
        <img
          src={iconoPerfil}
          alt="Icono de Perfil"
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={handleMenuToggle}
        />
      </div>

      {/* Menú lateral */}
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

      {/* Título fuera del cuadro */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12">Registro de pagos$</h1>

      {/* Contenedor del formulario de reservación */}
      <div className="flex w-full max-w-6xl mt-10 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Imagen a la izquierda */}
        <div className="w-1/3 pr-6 p-6">
          <img src={imagenReservacion} alt="Imagen" className="w-full h-auto rounded-lg shadow-md" />
        </div>

        {/* Formulario de reservación */}
        <div className="w-2/3 p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            {/* Fecha de Entrada */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Fecha de Entrada</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Fecha de Salida */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Fecha de Salida</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Cantidad de Huéspedes */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Cantidad de Huéspedes</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-pink-500"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} huésped(es)</option>
                ))}
              </select>
            </div>

            {/* Botón para Reservar */}
            <button className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition duration-300">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservacion;
