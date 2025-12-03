import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function Analyzer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("analizar");
  const [compareText, setCompareText] = useState("");
  const [similarityData, setSimilarityData] = useState(null);
  const [textoCorregido, setTextoCorregido] = useState(""); // { changed code }
  const resultRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setText("");
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setSimilarityData(null);

    if (!text && !file) {
      setError("Ingrese texto o seleccione un archivo");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      } else {
        formData.append("text", text);
      }

      const response = await axios.post(
        "http://localhost:4000/api/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);

      // Guardar en localStorage
      const prev = JSON.parse(localStorage.getItem("analisis")) || [];
      const nuevoTrabajo = {
        id: prev.length + 1,
        tipo: file ? "Archivo" : "Texto",
        nombre: file ? file.name : "Texto ingresado",
        summary: response.data.summary || "",
        fecha: new Date().toLocaleString(), // ← agregamos fecha/hora completa
        resultado: response.data
      };
      localStorage.setItem("analisis", JSON.stringify([...prev, nuevoTrabajo]));

    } catch (err) {
      console.error(err);
      setError("Error al analizar el texto");
    } finally {
      setLoading(false);
    }
  };

  // Corregir ortografía (usa endpoint backend /api/corrector/local)
  const corregir = async () => {
    const payload = text || result?.summary || "";
    if (!payload || !payload.trim()) {
      alert("Ingrese texto para corregir");
      return;
    }

    try {
      const resp = await axios.post("http://localhost:4000/api/corrector/local", {
        texto: payload // ← AQUÍ SE ARREGLA (cambié "text" por "texto")
      });
      const salida = resp.data?.textoCorregido || resp.data?.correctedText || resp.data?.corregido || resp.data?.texto || "";
      if (!salida) {
        alert("Error al corregir");
        return;
      }
      setTextoCorregido(salida);
    } catch (err) {
      console.error("Error corrigiendo:", err);
      alert("Error al corregir");
    }
  }; // { changed code }

  // 🔵 Resetear todo
  const handleNewReview = () => {
    setText("");
    setFile(null);
    setResult(null);
    setCompareText("");
    setSimilarityData(null);
    setError("");
    setActiveTab("analizar");
  };

  // 🟣 Enviar informe a n8n
  const handleSendToTeacher = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/analyze/send-n8n",
        { text, result }
      );

      alert("📨 Reporte enviado al docente correctamente");
    } catch (err) {
      alert("Error enviando a n8n");
      console.error(err);
    }
  };

  // 🔵 Descargar PDF
  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/analyze/pdf",
        { text, result },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_analisis.pdf";
      a.click();
    } catch (err) {
      alert("Error generando el PDF");
      console.error(err);
    }
  };

  const calculateSimilarity = (text1, text2) => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    const common = words1.filter((w) => words2.includes(w));
    const similarity = (common.length / words1.length) * 100;
    return { similarity: similarity.toFixed(2), common };
  };

  const handleCompare = () => {
    if (!text || !compareText) return;
    const data = calculateSimilarity(text, compareText);
    setSimilarityData(data);
  };

  // 🟢 Navegar a retroalimentación
  const handleViewFeedback = () => {
    if (!result) return;
    navigate("/retroalimentacion", { state: { analysisResult: result } });
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, similarityData]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col shadow-xl">
        <h2 className="text-xl font-bold text-emerald-400 mb-8">
          Revisor IA
        </h2>

        {["analizar", "ortografia", "citas", "plagio"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2 rounded-lg mb-3 transition ${
              activeTab === tab
                ? "bg-emerald-400 text-gray-900 font-semibold"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {tab === "analizar"
              ? "Analizar Texto"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-emerald-400 text-center mb-10">
          Revisor Académico IA
        </h1>

        {(activeTab === "analizar" || activeTab === "plagio") && (
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Escribe o pega tu texto aquí..."
              className="w-full bg-gray-800 p-4 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-emerald-400 outline-none"
            />

            <div>
              <input
                type="file"
                accept=".txt,.docx"
                onChange={handleFileChange}
                className="text-sm"
              />
              {file && <span className="ml-3 text-emerald-400">{file.name}</span>}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-emerald-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-emerald-300 transition shadow-md"
            >
              {loading ? "Analizando..." : "Analizar Texto"}
            </button>
          </div>
        )}

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {/* RESULTADOS */}
        {result && (
          <div ref={resultRef} className="mt-10 space-y-6">
            {/* TARJETAS */}
            {activeTab === "analizar" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-2">
                  Resumen
                </h2>
                <p>{result.summary}</p>
              </div>
            )}

            {activeTab === "ortografia" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-2">
                  Texto corregido
                </h2>
                <p>{textoCorregido || "Presiona el botón para corregir"}</p>
                <button
                  onClick={corregir}
                  className="mt-4 bg-emerald-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-emerald-300 transition"
                >
                  Corregir Ortografía
                </button>
              </div>
            )}

            {activeTab === "citas" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                  Citas detectadas
                </h2>
                <p>APA: {result.citations.APA.join(", ") || "Ninguna"}</p>
                <p>IEEE: {result.citations.IEEE.join(", ") || "Ninguna"}</p>
              </div>
            )}

            {activeTab === "plagio" && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                  Plagio detectado
                </h2>
                <p>{result.plagiarism.join(", ") || "Ninguno"}</p>

                <h3 className="mt-6 text-xl font-semibold">Comparar textos</h3>
                <textarea
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                  rows={4}
                  placeholder="Pega aquí el segundo texto…"
                  className="w-full bg-gray-800 p-4 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-emerald-400 outline-none mt-2"
                />

                <button
                  onClick={handleCompare}
                  className="mt-3 bg-emerald-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-emerald-300 transition"
                >
                  Comparar
                </button>

                {similarityData && (
                  <div className="flex items-center gap-10 mt-6">
                    <div className="w-32 h-32">
                      <CircularProgressbar
                        value={similarityData.similarity}
                        text={`${similarityData.similarity}%`}
                        styles={buildStyles({
                          textColor: "#00e676",
                          pathColor: "#00e676",
                          trailColor: "#333",
                        })}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Palabras coincidentes:
                      </h4>
                      <p>{similarityData.common.join(", ") || "Ninguna"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOTONES ACCIONES */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <button
                onClick={handleGeneratePDF}
                className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-lg shadow"
              >
                Descargar PDF
              </button>

              <button
                onClick={handleSendToTeacher}
                className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded-lg shadow"
              >
                Enviar al Docente (n8n)
              </button>

              <button
                onClick={handleNewReview}
                className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow"
              >
                Nueva Revisión
              </button>

              <button
                className="mt-4 bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
                onClick={() => navigate("/retroalimentacion", { state: { analysisResult: result } })}
              >
                Ver Retroalimentación
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Analyzer;
