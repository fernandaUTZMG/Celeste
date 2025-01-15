import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    campo1: '',
    campo2: '',
    campo3: '',
    campo4: '',
    campo5: '',
    campo6: '',
    campo7: '',
    campo8: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
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

  const handleSave = () => {
    console.log('Datos guardados:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white p-10 font-roboto relative">
      {/* Círculos decorativos */}
      <div className="absolute top-5 left-5 flex flex-col items-center space-y-3">
        <div className="w-6 h-6 bg-pink-500 rounded-full mb-3"></div>
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
          src="icono.jpg" 
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

      {/* Título principal */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center uppercase tracking-wide">
        Permiso de Portón
      </h1>

      {/* Formulario con 8 cuadros de texto */}
      <div className="w-full max-w-2xl mt-8 flex flex-col items-center">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-pink-700">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Fecha de solicitud', type: 'date' },
              { label: 'Fecha de inicio', type: 'date' },
              { label: 'Tiempo de permiso', type: 'text' },
              { label: 'Nombre de solicitante', type: 'text' },
              { label: 'Motivo de permiso', type: 'text' },
              { label: 'Estado de permiso', type: 'text' },
              { label: 'Numero de unidad', type: 'text' },
              { label: 'Fecha de fin', type: 'date' },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <label
                  htmlFor={`campo${idx + 1}`}
                  className="block text-gray-700 font-semibold mb-2 text-sm p-2 bg-pink-500 text-white rounded-lg w-full text-center"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={`campo${idx + 1}`}
                  value={formData[`campo${idx + 1}`]}
                  onChange={(e) => handleChange(e, `campo${idx + 1}`)}
                  className="w-full h-12 p-2 border border-pink-700 rounded-lg mt-1 text-sm text-center focus:ring-2 focus:ring-pink-500"
                />
              </div>
            ))}
          </div>

          {/* Botón de guardar */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSave}
              className="bg-pink-500 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-md hover:bg-pink-600 transition-transform hover:scale-105"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
