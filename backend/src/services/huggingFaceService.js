// src/services/huggingFaceService.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// Servicio principal para analizar texto
export const analyzeTextService = async (text) => {
  try {
    // 🔹 Resumen usando modelo de Hugging Face
    const summaryResp = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
    );

    const resumen = summaryResp.data[0]?.summary_text || text.slice(0, 200) + "...";

    // 🔹 Detección de citas APA/IEEE (regex simple)
    const citasAPA = text.match(/\([A-Za-z]+, \d{4}\)/g) || [];
    const citasIEEE = text.match(/\[\d+\]/g) || [];

    // 🔹 Corrección de ortografía (usamos modelo de Hugging Face)
    const spellCheckResp = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
    );
    const ortografia = "Revisión automática disponible (pendiente integración completa)";

    // 🔹 Plagio: comparación básica (simulación, luego puedes usar embeddings reales)
    const plagio = "Simulación: sin coincidencias detectadas";

    return {
      resumen,
      citasAPA,
      citasIEEE,
      ortografia,
      plagio,
    };
  } catch (error) {
    console.error("Error en analyzeTextService:", error.message);
    throw error;
  }
};

