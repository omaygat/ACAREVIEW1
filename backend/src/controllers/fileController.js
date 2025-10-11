import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { analyzeTextHandler as analyze } from "./analiza_control.js";
import Document from "../models/Document.js";

// este controller asume que multer guardó archivo en req.file.path
export async function uploadFileHandler(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: "Archivo no enviado" });

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let text = "";

    if (ext === ".pdf") {
      const buffer = await fs.readFile(filePath);
      const parsed = await pdfParse(buffer);
      text = parsed.text || "";
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value || "";
    } else {
      // txt u otros
      text = await fs.readFile(filePath, "utf-8");
    }

    // ahora reusar lógica de analyze: llamamos internamente a los servicios
    // construimos objeto similar a body para analyzeTextHandler
    req.body = { text, title: req.body.title || req.file.originalname, uploadedBy: req.body.uploadedBy || null };

    // opcional: eliminar archivo después de extraer
    try { await fs.unlink(filePath); } catch (e) { /* no fatal */ }

    return analyze(req, res);
  } catch (err) {
    console.error("uploadFileHandler error:", err);
    return res.status(500).json({ error: "Error procesando archivo" });
  }
}
