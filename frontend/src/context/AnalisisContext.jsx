import React, { createContext, useState } from "react";
import axios from "axios";

export const AnalisisContext = createContext();

export const AnalisisProvider = ({ children }) => {
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const analizarTexto = async (texto) => {
    setCargando(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:4000/api/analyze/text", { texto });
      setResultado(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  const analizarArchivo = async (file) => {
    setCargando(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:4000/api/analyze/file", formData);
      setResultado(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AnalisisContext.Provider value={{ resultado, cargando, error, analizarTexto, analizarArchivo }}>
      {children}
    </AnalisisContext.Provider>
  );
};
