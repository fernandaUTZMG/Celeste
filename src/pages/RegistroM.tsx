import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar Axios
import iconoPerfil from '../assets/icono.jpg';
import './multas.css';
import LoadingSpinner from './LoadingSpinner'; // Importamos el componente de la animación de carga


const Registro = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    estadoGrupo: '',
    descripcionInfraccion: '',
    metodoPago: '',
    monto: '',
    nombreInfractor: '',
    departamento: '', // Campo adicional para el departamento
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [isLoading, setIsLoading] = useState(false); // Estado para animación de carga
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
    setIsLoading(true); // Inicia la animación de carga
    try {
      console.log('Enviando datos:', formData);

      const response = await axios.post('https://apiss-81oo.onrender.com/api/insertar_multas', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      setSuccessMessage('Datos guardados con éxito');
      setErrorMessage('');
      setShowModal(true); // Muestra el modal de éxito
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
    setIsLoading(false); // Finaliza la animación de carga
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
              <label htmlFor="fecha" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Fecha
              </label>
              <input
                type="text"
                id="fecha"
                value={formData.fecha}
                onChange={(e) => handleChange(e, 'fecha')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Campo para departamento */}
            <div className="flex flex-col items-center">
              <label htmlFor="departamento" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Departamento
              </label>
              <input
                type="text"
                id="departamento"
                value={formData.departamento}
                onChange={(e) => handleChange(e, 'departamento')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Otros campos */}
            <div className="flex flex-col items-center">
              <label htmlFor="estadoGrupo" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Estado del grupo
              </label>
              <input
                type="text"
                id="estadoGrupo"
                value={formData.estadoGrupo}
                onChange={(e) => handleChange(e, 'estadoGrupo')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="descripcionInfraccion" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Descripción de la infracción
              </label>
              <input
                type="text"
                id="descripcionInfraccion"
                value={formData.descripcionInfraccion}
                onChange={(e) => handleChange(e, 'descripcionInfraccion')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="metodoPago" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Método de pago
              </label>
              <input
                type="text"
                id="metodoPago"
                value={formData.metodoPago}
                onChange={(e) => handleChange(e, 'metodoPago')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="monto" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Monto
              </label>
              <input
                type="text"
                id="monto"
                value={formData.monto}
                onChange={(e) => handleChange(e, 'monto')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="nombreInfractor" className="block font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center">
                Nombre del infractor
              </label>
              <input
                type="text"
                id="nombreInfractor"
                value={formData.nombreInfractor}
                onChange={(e) => handleChange(e, 'nombreInfractor')}
                className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-pink-600"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar el modal de éxito */}
      {showModal && (
  <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className={`bg-white p-8 rounded-lg shadow-lg modal ${showModal ? 'modal-enter-active' : 'modal-enter'}`}>
      <h2 className="text-xl font-bold text-green-500">¡Registro exitoso!</h2>
      <p className="mt-2 text-gray-700">Los datos se han guardado correctamente.</p>
      <button
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full"
        onClick={() => setShowModal(false)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}


      {/* Cargar la animación de carga */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Registro;
