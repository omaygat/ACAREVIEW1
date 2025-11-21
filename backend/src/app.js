import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();

// 🧠 Permitir solicitudes grandes (hasta 50 MB)
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🧩 Rutas
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => res.send("✅ Academic Review API está viva"));

export default app;
