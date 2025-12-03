import { correctGrammar } from "./huggingFaceService.js";

export async function checkGrammar(text) {
  const corrected = await correctGrammar(text);

  if (corrected) {
    const origWords = (text || "").split(/\s+/).filter(Boolean);
    const corrWords = (corrected || "").split(/\s+/).filter(Boolean);

    const corrections = [];

    const maxLen = Math.max(origWords.length, corrWords.length);

    for (let i = 0; i < maxLen; i++) {
      const original = origWords[i] || "";
      const suggestion = corrWords[i] || "";

      if (original !== suggestion) {
        corrections.push({ word: original, suggestion });
      }
    }

    return {
      correctedText: corrected,
      errors: corrections.length,   // ahora sí: realistas
      corrections
    };
  }

  // fallback
  return {
    correctedText: text,
    errors: 0,
    corrections: []
  };
}
