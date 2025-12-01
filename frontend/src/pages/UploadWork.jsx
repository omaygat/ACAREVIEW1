import { useState } from "react";
import axios from "axios";

export default function UploadWork() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("http://localhost:4000/api/analyze", formData);

    setResult(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Subir Trabajo</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload} style={{ marginTop: "1rem" }}>
        Subir y Analizar
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Resultado</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
