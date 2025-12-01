import { useState } from "react";
import api from "../api/api";

export default function SubirTrabajo() {
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResultado(data);
  };

  return (
    <div>
      <h2>Subir Trabajo</h2>
      <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Analizar</button>

      {resultado && (
        <pre>{JSON.stringify(resultado, null, 2)}</pre>
      )}
    </div>
  );
}
