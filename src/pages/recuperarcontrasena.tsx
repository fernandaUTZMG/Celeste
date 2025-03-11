import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Cerrar from './cerrar';

const RecuperarContra = () => {
  const [numero, setNumero] = useState('');

  const handleWhatsApp = () => {
    const mensaje = encodeURIComponent(`Hola, necesito recuperar mi contraseña. Mi número es: ${numero}`);
    window.open(`https://wa.me/52${numero}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8 font-roboto relative">
      <Cerrar />

      {/* Círculos decorativos */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center uppercase tracking-wide">
        Recuperar Contraseña
      </h1>

      {/* Formulario */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-pink-700">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Ingresa tu número de WhatsApp:
        </label>
        <input
          type="tel"
          placeholder="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full p-3 border-2 border-pink-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 mb-6"
        />

        <button
          onClick={handleWhatsApp}
          disabled={!numero || numero.length !== 10}
          className="w-full flex items-center justify-center bg-green-500 text-white text-lg font-bold py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform hover:scale-105 disabled:bg-gray-400"
        >
          <FaWhatsapp className="mr-2 text-2xl" />
          Enviar solicitud por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default RecuperarContra;
