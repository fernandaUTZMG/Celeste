import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CambiarContrasena() {
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone  || !newPassword || !confirmPassword) {
      setError('Por favor, complete todos los campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('https://apiss-81oo.onrender.com/api/newcontra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numero: phone,
          newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Contraseña cambiada exitosamente');
        navigate('/home');
      } else {
        setError(data.message || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-white p-8 relative">
      <h1 className="text-4xl font-bold text-gray-700 mb-8">Cambiar Contraseña</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Número de Teléfono:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Número telefónico"
            />
          </div>


          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Nueva Contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Nueva contraseña"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Confirmar nueva contraseña"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasena;