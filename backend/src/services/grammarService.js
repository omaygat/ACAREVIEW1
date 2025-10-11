import { correctGrammar } from "./huggingFaceService.js";

export async function checkGrammar(text) {
  const corrected = await correctGrammar(text);
  if (corrected) {
    // heurística simple de "errores": número de palabras distintas entre original y corregido
    const origWords = (text || "").split(/\s+/).filter(Boolean);
    const corrWords = (corrected || "").split(/\s+/).filter(Boolean);
    const errors = Math.max(0, origWords.length - corrWords.length);
    // para pruebas, devolvemos una lista básica de correcciones (diferencias)
    const corrections = [];
    // muy simple: listado de palabras que difieren en posición
    const n = Math.min(origWords.length, corrWords.length);
    for (let i = 0; i < n; i++) {
      if (origWords[i] !== corrWords[i]) corrections.push({ word: origWords[i], suggestion: corrWords[i] });
    }
    return {
      correctedText: corrected,
      errors,
      corrections
    };
  }
  // fallback: sin cambios
  return {
    correctedText: text,
    errors: 0,
    corrections: []
  };
}
