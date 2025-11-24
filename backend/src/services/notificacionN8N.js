import axios from "axios";

export async function enviarResultadosAN8N(resultados) {
  try {
    await axios.post(
      "https://viane.app.n8n.cloud/webhook-test/analizar-texto",
      resultados,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("📨 Resultados enviados a n8n correctamente");
  } catch (error) {
    console.error("❌ Error enviando resultados a n8n:", error.message);
  }
}
