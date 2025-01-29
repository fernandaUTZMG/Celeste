import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/iniciar_sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numero: phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('usuario', JSON.stringify(data.usuario)); // Guarda datos del usuario
        navigate('/home'); // Redirige a la página Home.tsx
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      {/* Círculos en forma de triángulo en la parte superior */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        {/* Círculo superior */}
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>

        {/* Dos círculos inferiores */}
        <div className="flex space-x-3">
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Inicia sesión o Regístrate</h1>
        <h2 className="text-lg text-center text-gray-600 mt-2">¡Te damos la bienvenida!</h2>
        <form onSubmit={handleLogin} className="mt-4">
          {/* Campo de selección del país */}
          <div className="mb-4">
            <label className="block text-gray-700">País/Región</label>
            <select className="w-full p-2 border border-pink-700 rounded mt-1">
              <option>México (+52)</option>
              <option>Argentina (+54)</option>
              <option>Colombia (+57)</option>
            </select>
          </div>

          {/* Campo para el número telefónico */}
          <div className="mb-4">
            <label className="block text-gray-700">Número telefónico</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border border-pink-700 rounded mt-1"
              placeholder="Número telefónico"
            />
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Información adicional */}
          <p className="text-xs text-gray-600 mb-4">
            Te confirmaremos el número por teléfono o mensaje de texto. Sujeto a tarifas estándar.
            <a href="#" className="text-pink-700"> Política de privacidad</a>
          </p>

          {/* Botón de continuar */}
          <button
            type="submit"
            className="w-full bg-pink-700 text-white font-bold py-2 rounded">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
