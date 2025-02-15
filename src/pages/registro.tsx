import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Agrega la importación

function Registro() {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Dueño');
  const [profile, setProfile] = useState('');
  const [departmentNumber, setDepartmentNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState(''); // Agregar campo para la contraseña

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone && role && profile && departmentNumber) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await fetch('https://apiss-81oo.onrender.com/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numero: phone,
            rol: role,
            password: hashedPassword, // Enviar la contraseña encriptada
            tipo_departamento: profile,
            id_departamento: departmentNumber, // Enviamos el número de departamento
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Usuario registrado exitosamente'); // Muestra una alerta
          navigate('/home');
        } else {
          alert('Error al registrar el usuario'); // Muestra una alerta

          setError(data.message || 'Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setError('Error al registrar el usuario');
      }
    } else {
      setError('Por favor, complete todos los campos');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-white p-8 relative">
      <h1 className="text-4xl font-bold text-gray-700 mb-8">Registro</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Regístrate como:</label>
            <div className="flex flex-wrap gap-6 mt-4">
              {['Dueño', 'Administrador', 'Administración'].map((option) => (
                <label key={option} className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    name="role"
                    value={option}
                    checked={role === option}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2 accent-pink-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Ingresa número de teléfono:</label>
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
            <label className="block text-gray-700 font-semibold">Número de departamento:</label>
            <input
              type="text"
              value={departmentNumber}
              onChange={(e) => setDepartmentNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Número de departamento"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Contraseña"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Lista de perfiles:</label>
            <div className="flex flex-wrap gap-6 mt-4">
              {['Departamento', 'Administración', 'Torre', 'Dueño', 'Administrador', 'Inquilino'].map((option) => (
                <label key={option} className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    name="profile"
                    value={option}
                    checked={profile === option}
                    onChange={(e) => setProfile(e.target.value)}
                    className="mr-2 accent-pink-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
          >
            Guardar
          </button>
        </form>
      </div>

      {/* Círculos dispersos con un acomodo más profesional */}
      <div className="absolute top-1/3 right-6 flex flex-wrap justify-between items-start w-full max-w-md">
        <div className="w-24 h-24 bg-pink-500 rounded-full mb-4 transform translate-x-6 translate-y-4"></div>
        <div className="w-28 h-28 bg-pink-500 rounded-full mb-4 transform translate-x-2 translate-y-6"></div>
        <div className="w-32 h-32 bg-pink-500 rounded-full mb-4 transform translate-x-8 translate-y-8"></div>
        <div className="w-36 h-36 bg-pink-500 rounded-full mb-4 transform translate-x-4 translate-y-10"></div>
        <div className="w-40 h-40 bg-pink-500 rounded-full mb-4 transform translate-x-12 translate-y-12"></div>
      </div>
    </div>
  );
}

export default Registro;