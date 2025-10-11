import axios from "axios";

// Analiza texto enviado directamente
export const analyzeText = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Texto vacío" });

  try {
    // Resumen con Hugging Face
    const summaryResp = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
    );

    const summary = summaryResp.data[0]?.summary_text || "No se pudo generar resumen";

    // Corrección ortográfica simple (ejemplo)
    const correctedText = text
      .replace(/\bteh\b/g, "the")
      .replace(/\brecieve\b/g, "receive");

    // Detección de citas APA/IEEE (ejemplo básico)
    const apaMatches = text.match(/\([A-Za-z]+, \d{4}\)/g) || [];
    const ieeeMatches = text.match(/\[\d+\]/g) || [];

    // Plagio (simulación: buscar repeticiones en el mismo texto)
    const words = text.split(/\s+/);
    const duplicates = words.filter((item, index) => words.indexOf(item) !== index);
    const plagiarism = [...new Set(duplicates)];

    // Respuesta JSON
    res.json({
      summary,
      correctedText,
      citations: { APA: apaMatches, IEEE: ieeeMatches },
      plagiarism,
    });
  } catch (error) {
    console.error("❌ Error en analyzeText:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al analizar el texto" });
  }
};
