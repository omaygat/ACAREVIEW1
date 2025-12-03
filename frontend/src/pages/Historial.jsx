import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Historial() {
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("analisis")) || [];
      setHistorial(stored.reverse()); // mostrar más recientes primero
    } catch (error) {
      console.error("Error leyendo el historial:", error);
      setHistorial([]);
    }
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <button
        onClick={() => navigate("/student")}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ← Volver al Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Historial de Trabajos Analizados</h1>

      {historial.length === 0 ? (
        <p>No hay trabajos analizados todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Tipo</th>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.id ?? index + 1}</td>
                  <td className="border px-4 py-2">{item.tipo ?? "Texto"}</td>
                  <td className="border px-4 py-2">{item.nombre ?? "Sin nombre"}</td>
                  <td className="border px-4 py-2">{item.fecha ?? "No registrada"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
