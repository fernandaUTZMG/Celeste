import React, { useEffect, useState } from "react";
import axios from "axios";

interface Notificacion {
  _id: string;
  fecha?: string;
  estadoGrupo?: string;
  descripcionInfraccion?: string;
  metodoPago?: string;
  monto?: string;
  nombreInfractor?: string;
  departamento: string;
  leido: boolean;
}

const Notis: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      setLoading(true);
      setError(null);

      let departamento = localStorage.getItem("departamento");
      console.log("📌 ID Departamento desde localStorage (ANTES):", departamento);

      if (!departamento) {
        setError("❌ No se encontró el departamento en localStorage.");
        setLoading(false);
        return;
      }

      departamento = String(departamento); // Convertir a string si es número
      console.log("📌 ID Departamento convertido a String:", departamento);

      try {
        const url = `http://localhost:4000/api/notificaciones/${departamento}`;
        console.log("📌 Haciendo petición a:", url);

        const response = await axios.get(url);
        console.log("📌 Datos recibidos de la API:", response.data);

        if (response.data.notificaciones && Array.isArray(response.data.notificaciones)) {
          setNotificaciones(response.data.notificaciones);
        } else {
          console.warn("⚠️ Respuesta de la API no es un array:", response.data);
          setNotificaciones([]);
        }
      } catch (error) {
        console.error("❌ Error al obtener notificaciones:", error);
        setError("Error al obtener notificaciones.");
        setNotificaciones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/notificaciones/${id}`, { leido: true });
      if (response.status === 200) {
        setNotificaciones(prevNotificaciones =>
          prevNotificaciones.map(notif =>
            notif._id === id ? { ...notif, leido: true } : notif
          )
        );
      }
    } catch (error) {
      console.error("❌ Error al marcar como leída:", error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Notificaciones</h2>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {!loading && !error && notificaciones.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No hay notificaciones disponibles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notificaciones.map((notif) => (
            <div
              key={notif._id}
              className={`relative p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl ${
                notif.leido ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"
              }`}
            >
              {/* Indicador de no leído */}
              {!notif.leido && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              )}

              {/* Icono de notificación */}
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-xs text-gray-500">{notif.fecha || "N/A"}</span>
              </div>

              {/* Contenido de la notificación */}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-800">{notif.nombreInfractor || "N/A"}</p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Descripción:</span> {notif.descripcionInfraccion || "N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Método de Pago:</span> {notif.metodoPago || "N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Monto:</span> {notif.monto || "N/A"}
                </p>
              </div>

              {/* Botón para marcar como leída */}
              {!notif.leido && (
                <button
                  onClick={() => handleMarkAsRead(notif._id)}
                  className="mt-2 w-full px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Marcar como leída
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notis;
