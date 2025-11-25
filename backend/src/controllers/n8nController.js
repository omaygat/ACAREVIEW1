import axios from "axios";

export const sendToN8N = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Texto requerido" });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook de n8n no configurado" });
    }

    const response = await axios.post(webhookUrl, { text });

    return res.json({
      ok: true,
      message: "Texto enviado al flujo n8n",
      n8nResponse: response.data,
    });

  } catch (error) {
    console.error("❌ Error enviando a n8n:", error.message);
    return res.status(500).json({ error: "Error enviando a n8n" });
  }
};
