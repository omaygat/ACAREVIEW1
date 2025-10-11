import express from "express";
import cors from "cors";

const app = express();

// Configurar CORS
app.use(cors());

// Aumentar límite de body-parser a 50mb
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Tus rutas
import analyzeRoutes from "./routes/analyzeRoutes.js";
app.use("/api", analyzeRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
