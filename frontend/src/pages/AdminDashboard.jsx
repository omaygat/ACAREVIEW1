import React from "react";
import { Users, FileText, AlertTriangle, Activity, Menu } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-950 p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-green-400 mb-8">Panel Admin</h1>

        <nav className="space-y-3">
          <button className="w-full text-left px-3 py-2 rounded bg-green-600 text-gray-900 font-medium">
            Dashboard
          </button>

          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800">
            Usuarios
          </button>

          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800">
            Revisiones Realizadas
          </button>

          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800">
            Alertas de Plagio
          </button>

          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-800">
            Ajustes
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* NAV TOP */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-400">Dashboard</h2>

          <button className="md:hidden p-2 rounded bg-gray-800">
            <Menu size={22} />
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <MetricCard
            title="Usuarios Registrados"
            value="1,284"
            icon={<Users size={32} />}
            color="bg-blue-500"
          />

          <MetricCard
            title="Revisiones Totales"
            value="5,932"
            icon={<FileText size={32} />}
            color="bg-green-500"
          />

          <MetricCard
            title="Alertas de Plagio"
            value="147"
            icon={<AlertTriangle size={32} />}
            color="bg-yellow-500"
          />

          <MetricCard
            title="Actividad Hoy"
            value="312"
            icon={<Activity size={32} />}
            color="bg-purple-500"
          />
        </div>

        {/* CHARTS AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md h-64">
            <h3 className="text-lg font-semibold mb-3">Revisiones por Semana</h3>
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>📊 Gráfico (Aún no implementado)</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md h-64">
            <h3 className="text-lg font-semibold mb-3">Alertas de Plagio</h3>
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>📊 Gráfico (Aún no implementado)</p>
            </div>
          </div>
        </div>

        {/* TABLE – Últimos análisis */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Últimos Análisis</h3>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2">Usuario</th>
                <th>Documento</th>
                <th>Fecha</th>
                <th>Plagio (%)</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              <Row user="Carlos Ruiz" file="Ensayo1.docx" date="02/12/2025" plagio="12%" status="OK" />
              <Row user="Ana Torres" file="TrabajoFinal.pdf" date="02/12/2025" plagio="48%" status="Atención" />
              <Row user="Luis Pérez" file="Tesis.docx" date="02/12/2025" plagio="3%" status="OK" />
              <Row user="María Lopez" file="Informe.docx" date="01/12/2025" plagio="67%" status="Crítico" />
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

/* COMPONENTE TARJETA DE MÉTRICAS */
function MetricCard({ title, value, icon, color }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color} text-gray-900`}>
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

/* COMPONENTE FILA DE TABLA */
function Row({ user, file, date, plagio, status }) {
  return (
    <tr className="border-b border-gray-700">
      <td className="py-3">{user}</td>
      <td>{file}</td>
      <td>{date}</td>
      <td>{plagio}</td>
      <td>
        <span
          className={`px-3 py-1 rounded text-sm ${
            status === "OK"
              ? "bg-green-600"
              : status === "Atención"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
