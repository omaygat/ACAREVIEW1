// src/services/huggingFaceService.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// 🔹 Nuevo endpoint obligatorio de Hugging Face
const HF_BASE = "https://router.huggingface.co/hf-inference/models/";

export const analyzeTextService = async (text) => {
  try {
    // 🔹 Resumen usando el modelo (nuevo endpoint)
    const summaryResp = await axios.post(
      `${HF_BASE}facebook/bart-large-cnn`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resumen =
      summaryResp.data?.summary_text ||
      summaryResp.data[0]?.summary_text ||
      text.slice(0, 200) + "...";

    // 🔹 Citas APA/IEEE
    const citasAPA = text.match(/\([A-Za-z]+, \d{4}\)/g) || [];
    const citasIEEE = text.match(/\[\d+\]/g) || [];

    // 🔹 Corrección de ortografía (solo placeholder)
    const spellCheckResp = await axios.post(
      `${HF_BASE}facebook/bart-large-mnli`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const ortografia = "Revisión automática disponible (pendiente integración completa)";

    // 🔹 Plagio (simulación)
    const plagio = "Simulación: sin coincidencias detectadas";

    return {
      resumen,
      citasAPA,
      citasIEEE,
      ortografia,
      plagio,
    };
  } catch (error) {
    console.error("❌ Error en analyzeTextService:", error.response?.data || error.message);
    throw error;
  }
};
