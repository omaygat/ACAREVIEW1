import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { analyzeText } from "./analiza_control.js";

function isZipBuffer(buf) {
  return buf && buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x03 && buf[3] === 0x04;
}

export async function extractTextFromFile(filePath, fileExt) {
  const buffer = await fs.readFile(filePath);
  if (fileExt === ".pdf") {
    const parsed = await pdfParse(buffer);
    return parsed.text || "";
  } else if (fileExt === ".docx") {
    if (!isZipBuffer(buffer)) throw new Error("Archivo .docx inválido o corrupto");
    const { value } = await mammoth.extractRawText({ buffer });
    return value || "";
  } else if (fileExt === ".txt") {
    return buffer.toString("utf8");
  } else {
    throw new Error("Formato no soportado");
  }
}

export async function uploadFileHandler(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "Archivo no enviado" });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    // ACEPTAR SOLO PDF
    if (ext !== ".pdf") {
      try { await fs.unlink(filePath); } catch (e) { /* ignore cleanup errors */ }
      return res.status(400).json({ error: "Solo se aceptan archivos .pdf" });
    }

    // Leer y extraer texto del PDF
    const buffer = await fs.readFile(filePath);
    let parsed;
    try {
      parsed = await pdfParse(buffer);
    } catch (err) {
      try { await fs.unlink(filePath); } catch (e) { /* ignore */ }
      console.error("pdf-parse error:", err);
      return res.status(400).json({ error: "No se pudo procesar el PDF" });
    }

    const text = parsed.text || "";

    // Limpiar archivo subido
    try { await fs.unlink(filePath); } catch (e) { /* ignore */ }

    // Reusar analyzeText pasando texto en req.body
    req.body = { text, title: req.body.title || req.file.originalname, uploadedBy: req.body.uploadedBy || null };
    return analyzeText(req, res);
  } catch (err) {
    console.error("uploadFileHandler error:", err);
    try { if (req?.file?.path) await fs.unlink(req.file.path); } catch (e) { /* ignore */ }
    return res.status(500).json({ error: "Error procesando archivo" });
  }
}
