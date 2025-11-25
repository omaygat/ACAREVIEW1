import express from "express";
import multer from "multer";
import { analyzeText } from "../controllers/analiza_control.js";
import { uploadFileHandler } from "../controllers/fileController.js";
import { sendToN8N } from "../controllers/n8nController.js";


const router = express.Router();
router.post("/send-n8n", sendToN8N);
// Guardar archivos temporalmente en carpeta /uploads
const upload = multer({ dest: "uploads/" });

// Ruta para analizar texto
router.post("/", analyzeText);

// Ruta para analizar archivos (PDF, Word, TXT)
router.post("/file", upload.single("file"), uploadFileHandler);

export default router;
