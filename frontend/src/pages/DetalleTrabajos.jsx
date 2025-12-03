import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetalleTrabajos() {
  const navigate = useNavigate();
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("analisis")) || [];
    setTrabajos(stored);
  }, []);

  const totalTextos = trabajos.filter(t => t.tipo === "Texto").length;
  const totalArchivos = trabajos.filter(t => t.tipo === "Archivo").length;

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <button
        onClick={() => navigate("/student")}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ← Volver al Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Detalle de Trabajos Analizados</h1>
      <p className="mb-4">
        Total Textos: <strong>{totalTextos}</strong> | Total Archivos: <strong>{totalArchivos}</strong>
      </p>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {trabajos.map((t, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{t.id || index + 1}</td>
              <td className="border px-4 py-2">{t.tipo}</td>
              <td className="border px-4 py-2">{t.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
