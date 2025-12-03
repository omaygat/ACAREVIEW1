import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";

export default function Retroalimentacion() {
  const location = useLocation();

  // 🔥 HACERLO MÁS SEGURO (evita crasheos)
  const data = location?.state?.analysisResult || null;

  // Si no llega data, mostrar un mensaje en vez de pantalla blanca
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          No se encontró información del análisis
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Es posible que hayas recargado la página o accedido directamente.
        </p>

        <Link 
          to="/analizador"
          className="text-green-700 hover:text-green-900 text-xl font-medium"
        >
          Volver al analizador
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <div className="mb-6">
        <Link 
          to="/analizador"
          className="inline-flex items-center text-green-700 hover:text-green-900 text-lg font-medium"
        >
          <ArrowLeft className="mr-2" /> Volver al Analizador
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Retroalimentación del Análisis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <Card className="shadow-lg border-l-4 border-green-600">
          <CardHeader className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <CardTitle className="text-gray-700">Texto Corregido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.correctedText.length} caracteres</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-red-600">
          <CardHeader className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" />
            <CardTitle className="text-gray-700">Errores Detectados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.errors}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-blue-600">
          <CardHeader className="flex items-center gap-2">
            <FileText className="text-blue-600" />
            <CardTitle className="text-gray-700">Correcciones Propuestas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.corrections.length}</p>
          </CardContent>
        </Card>

      </div>

      <Card className="shadow-lg mb-10">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">📘 Texto corregido</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="bg-gray-100 p-5 rounded-lg whitespace-pre-line text-gray-800 leading-relaxed text-lg">
            {data.correctedText}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">
            🛠️ Detalle de correcciones
          </CardTitle>
        </CardHeader>

        <CardContent>
          {data.corrections.length === 0 ? (
            <p className="text-gray-600">No se detectaron correcciones específicas.</p>
          ) : (
            <ul className="space-y-3">
              {data.corrections.map((c, idx) => (
                <li 
                  key={idx}
                  className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <p className="text-lg">
                    <span className="font-bold text-red-600">{c.word}</span> → 
                    <span className="text-green-700 ml-2 font-semibold">{c.suggestion}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="mt-10">
        <Link 
          to="/login"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-800 transition"
        >
          Volver a Inicio
        </Link>
      </div>

    </div>
  );
}
