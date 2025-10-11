import request from "supertest";
import express from "express";
import multer from "multer";
import { analyzeText, analyzeFile } from "../../src/controllers/analiza_control.js";

const app = express();
app.use(express.json());

const upload = multer();

// Rutas tal como en tu backend
app.post("/api/analyze", analyzeText);
app.post("/api/analyze-file", upload.single("file"), analyzeFile);

describe("Rutas de análisis", () => {

  test("POST /api/analyze debería responder 200 con texto analizado", async () => {
    const res = await request(app)
      .post("/api/analyze")
      .send({ text: "Hola mundo" });

    expect(res.statusCode).toBe(200);
    expect(res.body.summary).toBeDefined();
    expect(res.body.correctedText).toBeDefined();
    expect(res.body.citations).toBeDefined();
    expect(res.body.plagiarism).toBeDefined();
  });

  test("POST /api/analyze-file devuelve 400 si no hay archivo", async () => {
    const res = await request(app)
      .post("/api/analyze-file");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Archivo no recibido");
  });

  test("POST /api/analyze-file responde 200 con archivo simulado", async () => {
    const res = await request(app)
      .post("/api/analyze-file")
      .attach("file", Buffer.from("Contenido de prueba"), "test.txt");

    expect(res.statusCode).toBe(200);
    expect(res.body.summary).toBeDefined();
    expect(res.body.correctedText).toBeDefined();
    expect(res.body.citations).toBeDefined();
    expect(res.body.plagiarism).toBeDefined();
  });

});
