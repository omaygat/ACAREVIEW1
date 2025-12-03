import { corregirOrtografiaLocal } from "../services/correctorLocal.js";

export const correctorLocalController = async (req, res) => {
  console.log("📩 LLEGÓ AL BACKEND:", req.body);

  let { texto } = req.body;

  // 🔥 Fix: si viene como JSON string, lo parseamos
  if (typeof texto === "string" && texto.trim().startsWith("{")) {
    try {
      const json = JSON.parse(texto);
      texto = json.texto || texto;
    } catch {
      // si falla, seguimos con el string normal
    }
  }

  if (!texto) {
    return res.status(400).json({ error: "Falta el campo 'texto'" });
  }

  try {
    const corregido = await corregirOrtografiaLocal(texto);

    res.json({
      original: texto,
      corregido,
    });

  } catch (error) {
    console.error("❌ Error en corrector local:", error);
    res.status(500).json({ error: "Error al corregir ortografía" });
  }
};
