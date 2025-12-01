import { Link } from "react-router-dom";
import { Upload, FileText, BarChart3, Bell, CheckCircle } from "lucide-react";

export default function DashboardStudent() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard del Estudiante
      </h1>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Subir trabajo */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2">
            <Upload /> Analizar Nuevo Trabajo
          </div>
          <p className="text-gray-600 mb-4">
            Sube tu documento para analizar plagio, ortografía y formato APA.
          </p>
          <Link to="/analizador">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Subir y analizar
            </button>
          </Link>
        </div>

        {/* Historial */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-green-600 text-xl font-semibold mb-2">
            <FileText /> Historial de Trabajos
          </div>
          <p className="text-gray-600 mb-4">
            Revisa tus análisis y reportes anteriores.
          </p>
          <Link to="/estudiante/historial">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Ver historial
            </button>
          </Link>
        </div>

        {/* Notificaciones */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-yellow-600 text-xl font-semibold mb-2">
            <Bell /> Notificaciones
          </div>
          <p className="text-gray-600 mb-4">
            Mensajes y observaciones del docente.
          </p>
          <Link to="/estudiante/notificaciones">
            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700">
              Ver notificaciones
            </button>
          </Link>
        </div>
      </div>

      {/* Gráficas */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tu progreso</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Gráfica de rendimiento */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-2">Mejora por semanas</h3>
          <img
            className="rounded-lg"
            alt="grafica"
            src="https://quickchart.io/chart?c={type:'line',data:{labels:['Semana 1','Semana 2','Semana 3','Semana 4'],datasets:[{label:'Puntaje general',data:[50,65,72,85]}]}}"
          />
        </div>

        {/* Errores comunes */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-2">Errores más detectados</h3>
          <img
            className="rounded-lg"
            alt="grafica"
            src="https://quickchart.io/chart?c={type:'bar',data:{labels:['APA','Ortografía','Coherencia','Plagio'],datasets:[{label:'Frecuencia',data:[5,12,7,2]}]}}"
          />
        </div>
      </div>

      {/* Estado de tareas */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Estado de tus trabajos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-md p-5 rounded-xl text-center">
          <CheckCircle className="text-green-600 mx-auto mb-2" size={40} />
          <h3 className="font-semibold text-xl text-green-700">Finalizados</h3>
          <p className="text-gray-600 mt-2 text-lg">12 trabajos</p>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl text-center">
          <CheckCircle className="text-blue-600 mx-auto mb-2 rotate-90" size={40} />
          <h3 className="font-semibold text-xl text-blue-700">En progreso</h3>
          <p className="text-gray-600 mt-2 text-lg">3 trabajos</p>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl text-center">
          <CheckCircle className="text-yellow-500 mx-auto mb-2 -rotate-45" size={40} />
          <h3 className="font-semibold text-xl text-yellow-600">Pendientes</h3>
          <p className="text-gray-600 mt-2 text-lg">2 trabajos</p>
        </div>

      </div>
    </div>
  );
}
