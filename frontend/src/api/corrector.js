const API_URL = "http://localhost:4000/api/corrector/local";

export async function corregirOrtografia(texto) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }) // ← SOLO esto, SIN stringify adentro
    });

    if (!res.ok) {
      console.error("❌ Error en respuesta del servidor:", res.status);
      return null;
    }

    return await res.json();

  } catch (err) {
    console.error("❌ Error llamando al backend:", err);
    return null;
  }
}
