import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Asegúrate de importar Axios
import iconoPerfil from '../assets/icono.jpg';

const Registro = () => {
  const [formData, setFormData] = useState({
    campo1: '',
    campo2: '',
    campo3: '',
    campo4: '',
    campo5: '',
    campo6: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile);
    setIsMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log('Enviando datos:', formData);
  
      const response = await axios.post('http://localhost:5000/api/registro', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Respuesta del servidor:', response.data);
      setSuccessMessage('Datos guardados con éxito');
      setErrorMessage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error al guardar el registro:', error.response?.data);
        setErrorMessage(error.response?.data?.message || 'Error desconocido');
      } else {
        console.error('Error desconocido:', error);
        setErrorMessage('Error desconocido al guardar el registro');
      }
      setSuccessMessage('');
    }
  };
  



  
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white p-10 font-roboto relative">
      
      {/* Círculos en forma de triángulo (uno arriba y dos abajo) en la parte superior */}
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

      {/* Mensajes de éxito o error */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Título principal */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center uppercase tracking-wide">
        Registro de Multas
      </h1>

      {/* Contenedor de los cuadros de texto alineado a la derecha */}
      <div className="w-full max-w-2xl mt-8 flex flex-col items-center">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-pink-700">
          {/* Los cuadros de texto */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <label htmlFor="campo1" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Fecha
              </label>
              <input
                type="text"
                id="campo1"
                value={formData.campo1}
                onChange={(e) => handleChange(e, 'campo1')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Otros campos */}
            <div className="flex flex-col items-center">
              <label htmlFor="campo2" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Estado del grupo
              </label>
              <input
                type="text"
                id="campo2"
                value={formData.campo2}
                onChange={(e) => handleChange(e, 'campo2')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="campo3" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Descripción de la infracción
              </label>
              <input
                type="text"
                id="campo3"
                value={formData.campo3}
                onChange={(e) => handleChange(e, 'campo3')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="campo4" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Método de pago
              </label>
              <input
                type="text"
                id="campo4"
                value={formData.campo4}
                onChange={(e) => handleChange(e, 'campo4')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="campo5" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Monto
              </label>
              <input
                type="text"
                id="campo5"
                value={formData.campo5}
                onChange={(e) => handleChange(e, 'campo5')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="campo6" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Nombre del infractor
              </label>
              <input
                type="text"
                id="campo6"
                value={formData.campo6}
                onChange={(e) => handleChange(e, 'campo6')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 w-full flex justify-center">
          <button
            onClick={handleSave}
            className="w-full bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition-transform hover:scale-105"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
