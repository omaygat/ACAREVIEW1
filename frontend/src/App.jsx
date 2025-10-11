import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("analizar");
  const [compareText, setCompareText] = useState("");
  const [similarityData, setSimilarityData] = useState(null);
  const resultRef = useRef(null);

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

    let textToSend = text;
    if (file) {
      try {
        textToSend = await readFileAsText(file);
      } catch {
        setError("Error leyendo el archivo");
        setLoading(false);
        return;
      }
    }

    if (!textToSend) {
      setError("Ingrese texto o seleccione un archivo");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/analyze", {
        text: textToSend,
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Error al analizar el texto");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, similarityData]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#121212", color: "#e0e0e0" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", padding: "1rem", backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "1.5rem", color: "#00e676" }}>Menú</h2>
        {["analizar", "ortografia", "citas", "plagio"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginBottom: "0.75rem",
              padding: "0.5rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: activeTab === tab ? "#00e676" : "#333",
              color: activeTab === tab ? "#121212" : "#e0e0e0",
              transition: "all 0.3s",
            }}
          >
            {tab === "analizar" ? "Analizar Texto" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#00e676" }}>Revisor Académico IA</h1>

        {(activeTab === "analizar" || activeTab === "plagio") && (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe o pega tu texto aquí..."
              rows={6}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginBottom: "1rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #333",
                backgroundColor: "#1e1e1e",
                color: "#e0e0e0",
              }}
            />
            <div style={{ marginBottom: "1rem" }}>
              <input type="file" accept=".txt,.docx" onChange={handleFileChange} />
              {file && <span style={{ marginLeft: "1rem" }}>{file.name}</span>}
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                padding: "0.5rem 1rem",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                backgroundColor: "#00e676",
                color: "#121212",
                border: "none",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              {loading ? "Analizando..." : "Analizar Texto"}
            </button>
          </>
        )}

        {error && <p style={{ color: "#ff1744", marginTop: "1rem" }}>{error}</p>}

        {/* Resultados */}
        {result && (
          <div ref={resultRef} style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
            {/* Resumen */}
            {activeTab === "analizar" && (
              <div style={{ borderRadius: "12px", padding: "1rem", backgroundColor: "#1e1e1e", boxShadow: "0 0 15px rgba(0,0,0,0.5)", transition: "transform 0.3s" }}>
                <h2 style={{ color: "#00e676" }}>Resumen</h2>
                <p>{result.summary}</p>
              </div>
            )}

            {/* Ortografía */}
            {activeTab === "ortografia" && (
              <div style={{ borderRadius: "12px", padding: "1rem", backgroundColor: "#1e1e1e", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
                <h2 style={{ color: "#00e676" }}>Texto Corregido</h2>
                <p>{result.correctedText}</p>
              </div>
            )}

            {/* Citas */}
            {activeTab === "citas" && (
              <div style={{ borderRadius: "12px", padding: "1rem", backgroundColor: "#1e1e1e", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
                <h2 style={{ color: "#00e676" }}>Citas Detectadas</h2>
                <p>APA: {result.citations.APA.length ? result.citations.APA.join(", ") : "Ninguna"}</p>
                <p>IEEE: {result.citations.IEEE.length ? result.citations.IEEE.join(", ") : "Ninguna"}</p>
              </div>
            )}

            {/* Plagio */}
            {activeTab === "plagio" && (
              <div style={{ borderRadius: "12px", padding: "1rem", backgroundColor: "#1e1e1e", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
                <h2 style={{ color: "#00e676" }}>Plagio Detectado</h2>
                <p>{result.plagiarism.length ? result.plagiarism.join(", ") : "Ninguno"}</p>

                <h3 style={{ marginTop: "1rem" }}>Comparar con otro texto</h3>
                <textarea
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                  placeholder="Pega aquí texto para comparar..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #333",
                    backgroundColor: "#1e1e1e",
                    color: "#e0e0e0"
                  }}
                />
                <button
                  onClick={handleCompare}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#00e676",
                    color: "#121212",
                    border: "none",
                    borderRadius: "6px",
                    marginBottom: "1rem"
                  }}
                >
                  Comparar
                </button>

                {similarityData && (
                  <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    <div style={{ width: "120px", height: "120px" }}>
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
                      <h4>Palabras coincidentes:</h4>
                      <p>{similarityData.common.join(", ") || "Ninguna"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
