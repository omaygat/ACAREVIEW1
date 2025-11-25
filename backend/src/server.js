import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import multer from "multer";
import fs from "fs";
import { analyzeText } from "./controllers/analiza_control.js";
import mammoth from "mammoth";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { sendToN8N } from "./controllers/n8nController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const upload = multer({ dest: "uploads/", limits: { fileSize: 50 * 1024 * 1024 } }); // 50 MB

// 💥 PRIMERO EL WEBHOOK PARA EVITAR CONFLICTOS
app.post("/api/analyze/send-n8n", sendToN8N);

// 🚀 Ruta de análisis (acepta texto o archivo)
app.post("/api/analyze", upload.single("file"), async (req, res) => {
  try {
    let text = "";

    // Si envían texto directamente
    if (req.body.text) {
      text = req.body.text;
    }

    // Si envían archivo
    if (req.file) {
      const filePath = req.file.path;
      const fileExt = req.file.originalname.split(".").pop().toLowerCase();

      if (fileExt === "pdf") {
        const buffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
      } else if (fileExt === "docx") {
        const buffer = fs.readFileSync(filePath);
        const { value } = await mammoth.extractRawText({ buffer });
        text = value;
      } else if (fileExt === "txt") {
        text = fs.readFileSync(filePath, "utf8");
      } else {
        try { fs.unlinkSync(filePath); } catch {}
        return res.status(400).json({ error: "Formato no soportado" });
      }

      try { fs.unlinkSync(filePath); } catch {}
    }

    req.body.text = text; // ponemos el texto en req.body
    return analyzeText(req, res); // llamamos a tu controlador
  } catch (err) {
    console.error("Error al procesar archivo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => res.send("✅ Servidor corriendo"));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
