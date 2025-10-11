import Document from "../models/Document.js";

// term frequency map
function tfMap(text = "") {
  const words = (text || "").toLowerCase().match(/\b[a-záéíóúñ0-9]+\b/g) || [];
  const map = new Map();
  for (const w of words) map.set(w, (map.get(w) || 0) + 1);
  return map;
}

function dotProduct(mapA, mapB) {
  let dot = 0;
  for (const [k, v] of mapA.entries()) {
    if (mapB.has(k)) dot += v * mapB.get(k);
  }
  return dot;
}

function magnitude(map) {
  let sum = 0;
  for (const v of map.values()) sum += v * v;
  return Math.sqrt(sum);
}

function cosineSimilarity(textA, textB) {
  const A = tfMap(textA);
  const B = tfMap(textB);
  const denom = magnitude(A) * magnitude(B);
  if (denom === 0) return 0;
  return dotProduct(A, B) / denom;
}

export async function checkPlagiarism(text) {
  const docs = await Document.find({}, { text: 1, title: 1 }).lean();
  const results = [];
  for (const d of docs) {
    if (!d.text) continue;
    const sim = cosineSimilarity(text, d.text);
    results.push({ docId: d._id, title: d.title || "Sin título", similarity: Number(sim.toFixed(4)) });
  }
  // ordenar descendente
  results.sort((a, b) => b.similarity - a.similarity);
  // devolver top 5
  return results.slice(0, 5);
}
