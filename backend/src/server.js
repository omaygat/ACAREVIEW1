import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Conexión a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/analyze", analyzeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
