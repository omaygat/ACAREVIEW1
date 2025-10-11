import { summarizeText } from "./huggingFaceService.js";

export async function summarize(text) {
  const out = await summarizeText(text);
  if (out) return out;
  // fallback muy simple (primeras 3 oraciones)
  const sentences = (text || "").split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 3).join(" ");
}
