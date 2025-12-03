// src/services/huggingFaceService.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// Nuevo endpoint del router
const HF_BASE = "https://router.huggingface.co/hf-inference/models/";

export const analyzeTextService = async (text) => {
  try {
    // --- RESUMEN ---
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

    // --- CITAS APA / IEEE ---
    const citasAPA = text.match(/\([A-Za-z]+, \d{4}\)/g) || [];
    const citasIEEE = text.match(/\[\d+\]/g) || [];

    // --- CORRECCIÓN DE ORTOGRAFÍA REAL ---
    const spellingResp = await axios.post(
      `${HF_BASE}pszemraj/flan-t5-large-grammar-synthesis`,
      {
        inputs: `fix grammar and spelling: ${text}`
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        }
      }
    );

    const ortografia =
      spellingResp.data?.generated_text ||
      spellingResp.data[0]?.generated_text ||
      "No se pudo corregir";

    // --- PLAGIO (simulado por ahora) ---
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
