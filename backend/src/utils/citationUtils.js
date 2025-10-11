export function detectCitations(text = "") {
  const apaPatterns = [
    // (Apellido, 2020) o (Apellido y Apellido, 2020)
    /\([A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ]+(?:\sy\s[A-Z][A-Za-z]+)?,\s*\d{4}\)/g,
    // Apellido (2020)
    /[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ]+\s*\(\d{4}\)/g
  ];
  const ieeePattern = /\[\d+\]/g; // [1], [2]

  const apaMatches = new Set();
  for (const r of apaPatterns) {
    const found = text.match(r) || [];
    found.forEach(f => apaMatches.add(f));
  }

  const ieeeMatches = text.match(ieeePattern) || [];

  return {
    apa: Array.from(apaMatches),
    ieee: ieeeMatches
  };
}
