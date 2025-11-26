import axios from "axios";

const N8N_WEBHOOK_URL = "https://viane.app.n8n.cloud/webhook-test/analizar-texto";


export async function enviarResultadosAN8N(payload) {
  try {
    const resp = await axios.post(N8N_WEBHOOK_URL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
    return resp.data;
  } catch (err) {
    console.error("Error enviando a n8n:", err?.response?.data || err?.message || err);
    return null;
  }
}

// Config HF router
const HF_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";
const HF_HEADERS = (key) => ({
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
});

async function callHf(text) {
  const resp = await axios.post(
    HF_URL,
    { inputs: text },
    { headers: HF_HEADERS(process.env.HUGGINGFACE_API_KEY) }
  );

  if (resp.data?.summary_text) return resp.data.summary_text;
  if (Array.isArray(resp.data) && resp.data[0]?.summary_text) return resp.data[0].summary_text;
  if (resp.data?.generated_text) return resp.data.generated_text;
  if (typeof resp.data === "string") return resp.data;
  return "";
}

function chunkTextChars(text, size = 2000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
  return chunks;
}

async function safeCallChunk(chunk, attempt = 0) {
  try {
    return await callHf(chunk);
  } catch (err) {
    const msg = err?.response?.data || err?.message || String(err);
    if (msg.toLowerCase().includes("index out of range") && attempt < 3) {
      const smaller = chunk.slice(0, Math.max(500, Math.floor(chunk.length / 2)));
      return safeCallChunk(smaller, attempt + 1);
    }
    throw err;
  }
}

export const analyzeText = async (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: "Texto vacío" });

  try {
    let summary = "";
    try {
      const chunks = text.length > 2000 ? chunkTextChars(text, 2000) : [text];
      const partials = [];

      for (const c of chunks) {
        const s = await safeCallChunk(c);
        partials.push(s || c.slice(0, 400));
      }

      const joined = partials.join("\n\n");
      try {
        summary = joined.length > 2000 ? await safeCallChunk(joined) : joined;
      } catch {
        summary = text.substring(0, 400) + (text.length > 400 ? "..." : "");
      }
    } catch (hfErr) {
      console.error("❌ Hugging Face error:", hfErr?.response?.data || hfErr?.message);
      summary = text.substring(0, 400) + (text.length > 400 ? "..." : "");
    }

    const correctedText = text
      .replace(/\bteh\b/gi, "the")
      .replace(/\brecieve\b/gi, "receive");

    const apaMatches = text.match(/\([A-Za-zÁÉÍÓÚÑáéíóúñ]+, \d{4}\)/g) || [];
    const ieeeMatches = text.match(/\[\d+\]/g) || [];

    const words = text.split(/\s+/).filter(Boolean).map(w => w.toLowerCase());
    const duplicates = words.filter((w, i) => words.indexOf(w) !== i);
    const plagiarism = Array.from(new Set(duplicates)).slice(0, 20);

    // 🔥 Enviar resultados a n8n
    await enviarResultadosAN8N({
      summary,
      correctedText,
      citations: { APA: apaMatches, IEEE: ieeeMatches },
      plagiarism,
      textoOriginal: text,
      fecha: new Date(),
    });

    return res.json({
      summary,
      correctedText,
      citations: { APA: apaMatches, IEEE: ieeeMatches },
      plagiarism,
      enviadoA: "n8n",
    });
  } catch (error) {
    console.error("❌ Error en analyzeText:", error?.message);
    return res.status(500).json({ error: "Error al analizar el texto" });
  }
};
