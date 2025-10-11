import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => res.send("Academic Review API está viva"));

export default app;
