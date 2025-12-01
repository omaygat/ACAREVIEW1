import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import authRoutes from "./routes/auth.js";
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

// ⭐ Conectar a MongoDB
connectDB();

// ⭐ Middleware PRINCIPAL — debe ir ANTES de las rutas
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ⭐ Rutas de autenticación
app.use("/api/auth", authRoutes);

// ⭐ Multer para subir archivos
const upload = multer({ dest: "uploads/", limits: { fileSize: 50 * 1024 * 1024 } });

// ⭐ Webhook hacia n8n
app.post("/api/analyze/send-n8n", sendToN8N);

// ⭐ Ruta principal para análisis
app.post("/api/analyze", upload.single("file"), async (req, res) => {
  try {
    let text = "";

    if (req.body.text) text = req.body.text;

    if (req.file) {
      const filePath = req.file.path;
      const fileExt = req.file.originalname.split(".").pop().toLowerCase();

      if (fileExt === "pdf") {
        const buffer = fs.readFileSync(filePath);
        text = (await pdfParse(buffer)).text;
      } else if (fileExt === "docx") {
        const buffer = fs.readFileSync(filePath);
        text = (await mammoth.extractRawText({ buffer })).value;
      } else if (fileExt === "txt") {
        text = fs.readFileSync(filePath, "utf8");
      } else {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: "Formato no soportado" });
      }

      fs.unlinkSync(filePath);
    }

    req.body.text = text;
    return analyzeText(req, res);

  } catch (err) {
    console.error("Error al procesar archivo:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ⭐ Rutas extra de análisis
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => res.send("✅ Servidor corriendo"));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
