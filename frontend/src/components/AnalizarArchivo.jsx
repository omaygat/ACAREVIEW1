import React, { useState, useContext } from "react";
import { AnalisisContext } from "../context/AnalisisContext.jsx";

const AnalizarArchivo = () => {
  const [file, setFile] = useState(null);
  const { analizarArchivo } = useContext(AnalisisContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    analizarArchivo(file);
  };

  return (
    <div>
      <h2>Analizar Archivo</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt,.doc,.docx,.pdf" onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <button type="submit">Analizar Archivo</button>
      </form>
    </div>
  );
};

export default AnalizarArchivo;
