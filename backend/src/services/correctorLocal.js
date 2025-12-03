import fetch from "node-fetch";

export async function corregirOrtografiaLocal(texto) {
  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "microsoft/Phi-3-mini-128k-instruct",
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: `Corrige ortografía y gramática sin cambiar el significado. Solo devuelve el texto corregido, sin comentarios:\n\n${texto}`
          }
        ]
      })
    });

    const data = await response.json();
    console.log("🔍 RESPUESTA HF:", data);

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Respuesta vacía del modelo");
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("❌ Error correctorLocal:", error);
    throw error;
  }
}
