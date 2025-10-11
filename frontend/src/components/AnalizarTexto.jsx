import React, { useState, useContext } from "react";
import { AnalisisContext } from "../context/AnalisisContext.jsx";

const AnalizarTexto = () => {
  const [texto, setTexto] = useState("");
  const { analizarTexto } = useContext(AnalisisContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.trim() === "") return;
    analizarTexto(texto);
  };

  return (
    <div>
      <h2>Analizar Texto</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={6}
          cols={60}
          placeholder="Escribe o pega tu texto aquí..."
        />
        <br />
        <button type="submit">Analizar</button>
      </form>
    </div>
  );
};

export default AnalizarTexto;
