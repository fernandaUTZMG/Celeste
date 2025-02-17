import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [telefono, setTelefono] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!telefono) {
      setShowWarning(true);
      setLoginError('');
    } else {
      setShowWarning(false);
      setLoginError('');

      try {
        const response = await fetch('https://apiss-81oo.onrender.com/api/iniciar_sesion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numero: telefono, password: telefono }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Inicio de sesión exitoso:', data);
  
          // Verificar si 'usuario' existe en la respuesta
          if (!data.usuario) {
            throw new Error('La respuesta de la API no contiene información de usuario.');
          }
  
          const { numero, rol, departamento, id_departamento } = data.usuario;

          localStorage.setItem('numero', numero);
          localStorage.setItem('userRole', rol);
          localStorage.setItem('tipo_departamento', departamento);
          localStorage.setItem('departamento', id_departamento);
          localStorage.setItem('token', data.token);
          
          console.log(localStorage.getItem('userRole'));
          console.log(localStorage.getItem('id_departamento'));

          if (rol === 'Administrador') {
            navigate('/admin');
          } else {
            navigate('/rr');
          }
        } else {
          setLoginError('Tu nombre de usuario o contraseña son incorrectos');
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setLoginError('Hubo un problema con el servidor, por favor intenta más tarde');
      }
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
        <form onSubmit={handleSubmit} className="mt-4">
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
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className="w-full p-2 border border-pink-700 rounded mt-1"
              placeholder="Número telefónico"
            />
          </div>


          {/* Mensaje de error */}
          {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
          {showWarning && <p className="text-yellow-500 text-sm mb-2">Por favor ingresa el número y la contraseña.</p>}

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
