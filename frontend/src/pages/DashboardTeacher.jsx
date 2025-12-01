import { Link } from "react-router-dom";
import { Bell, FileCheck, Users, BarChart3, Settings } from "lucide-react";

export default function DashboardTeacher() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard del Docente
      </h1>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Trabajos por revisar */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-blue-600 text-xl font-semibold mb-2">
            <FileCheck /> Trabajos Recibidos
          </div>
          <p className="text-gray-600 mb-4">
            Revisa los documentos enviados por los estudiantes.
          </p>
          <Link to="/docente/revisiones">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Ver trabajos
            </button>
          </Link>
        </div>

        {/* Estudiantes */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-green-600 text-xl font-semibold mb-2">
            <Users /> Estudiantes
          </div>
          <p className="text-gray-600 mb-4">
            Observa el desempeño de tus estudiantes.
          </p>
          <Link to="/docente/estudiantes">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Ver lista
            </button>
          </Link>
        </div>

        {/* Alertas */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-red-600 text-xl font-semibold mb-2">
            <Bell /> Alertas
          </div>
          <p className="text-gray-600 mb-4">
            Nuevos trabajos enviados y notificaciones importantes.
          </p>
          <Link to="/docente/alertas">
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Ver alertas
            </button>
          </Link>
        </div>

        {/* Configuración */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition cursor-pointer">
          <div className="flex items-center gap-2 text-gray-700 text-xl font-semibold mb-2">
            <Settings /> Configuración
          </div>
          <p className="text-gray-600 mb-4">
            Ajustes de revisiones, cursos y criterios.
          </p>
          <Link to="/docente/config">
            <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
              Configurar
            </button>
          </Link>
        </div>

      </div>

      {/* Gráficas */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Estadísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gráfica 1 */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-2">
            Errores más frecuentes por semana
          </h3>
          <img
            alt="grafica"
            className="rounded-lg"
            src="https://quickchart.io/chart?c={type:'bar',data:{labels:['Gramática','APA','Coherencia','Ortografía'],datasets:[{label:'Frecuencia',data:[15,10,7,22]}]}}"
          />
        </div>

        {/* Gráfica 2 */}
        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-2">
            Progreso de los estudiantes
          </h3>
          <img
            alt="grafica"
            className="rounded-lg"
            src="https://quickchart.io/chart?c={type:'line',data:{labels:['Semana 1','Semana 2','Semana 3','Semana 4'],datasets:[{label:'Mejoras (%)',data:[10,25,40,55]}]}}"
          />
        </div>

      </div>
    </div>
  );
}
