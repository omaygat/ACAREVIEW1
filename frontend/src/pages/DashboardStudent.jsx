import { Link, useNavigate } from "react-router-dom";
import { Bell, FileText, BarChart3, CheckCircle, AlertTriangle, LogOut } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "../components/ui/card";

export default function DashboardStudent() {
  const navigate = useNavigate();

  // Traemos los trabajos desde localStorage para mostrar el total
  const trabajos = JSON.parse(localStorage.getItem("analisis")) || [];
  const totalTextos = trabajos.filter(t => t.tipo === "Texto").length;
  const totalArchivos = trabajos.filter(t => t.tipo === "Archivo").length;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-green-700 text-white p-6 hidden md:flex flex-col shadow-xl">
        <h2 className="text-3xl font-bold mb-10 tracking-tight">ACAREVIEW</h2>

        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link className="hover:text-yellow-300 transition" to="/student">📊 Dashboard</Link>
          <Link className="hover:text-yellow-300 transition" to="/analizador">📄 Analizar Trabajo</Link>
          <Link className="hover:text-yellow-300 transition" to="/student/historial">📚 Historial</Link>
          <Link className="hover:text-yellow-300 transition" to="/student/notificaciones">🔔 Notificaciones</Link>
          <Link className="hover:text-yellow-300 transition" to="/perfil">👤 Perfil</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Resumen general del estudiante</p>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <LogOut size={20} />
              Volver al Inicio
            </button>
            <Bell className="text-gray-600 cursor-pointer hover:text-gray-800 transition" size={26} />
            <img
              src="https://i.pravatar.cc/50"
              alt="user"
              className="rounded-full w-12 h-12 border-2 border-gray-300"
            />
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card
            className="shadow-lg border-l-4 border-blue-500 cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate("/student/analizados")}
          >
            <CardHeader className="flex items-center gap-2">
              <FileText className="text-blue-500" />
              <CardTitle className="text-gray-700">Trabajos Analizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{trabajos.length}</p>
              <span className="text-blue-600 text-sm">{totalTextos} textos / {totalArchivos} archivos</span>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-green-500 cursor-pointer hover:shadow-xl transition">
            <CardHeader className="flex items-center gap-2">
              <BarChart3 className="text-green-500" />
              <CardTitle className="text-gray-700">Promedio General</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">85%</p>
              <span className="text-green-600 text-sm">Últimos 30 días</span>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-red-500 cursor-pointer hover:shadow-xl transition">
            <CardHeader className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" />
              <CardTitle className="text-gray-700">Errores Detectados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">27</p>
              <span className="text-red-600 text-sm">Este mes</span>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-purple-500 cursor-pointer hover:shadow-xl transition">
            <CardHeader className="flex items-center gap-2">
              <CheckCircle className="text-purple-500" />
              <CardTitle className="text-gray-700">Correcciones Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">18</p>
              <span className="text-purple-600 text-sm">Última semana</span>
            </CardContent>
          </Card>
        </div>

        {/* GRÁFICAS */}
        <h2 className="text-xl font-bold mb-3 text-gray-700">Evolución de Puntajes</h2>
        <Card className="shadow-lg mb-10">
          <CardContent>
            <img
              className="rounded-lg"
              alt="grafica"
              src="https://quickchart.io/chart?c={type:'line',data:{labels:['Semana 1','Semana 2','Semana 3','Semana 4'],datasets:[{label:'Puntaje general',data:[50,65,72,85]}]}}"
            />
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-3 text-gray-700">Errores más comunes</h2>
        <Card className="shadow-lg">
          <CardContent>
            <img
              className="rounded-lg"
              alt="grafica"
              src="https://quickchart.io/chart?c={type:'bar',data:{labels:['APA','Ortografía','Coherencia','Plagio'],datasets:[{label:'Frecuencia',data:[12,18,9,3]}]}}"
            />
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
