import axios from "axios";
import { analyzeText } from "../../src/controllers/analiza_control.js";

jest.mock("axios");

describe("Hugging Face Service", () => {
  it("debería retornar resumen desde Hugging Face", async () => {
    axios.post.mockResolvedValueOnce({ data: [{ summary_text: "Resumen simulado" }] });

    const req = { body: { text: "Texto de prueba" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await analyzeText(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      summary: "Resumen simulado"
    }));
  });

  it("maneja errores de red correctamente", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    const req = { body: { text: "Texto de prueba" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await analyzeText(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error al analizar el texto" }); // 🔹 mensaje coincide con tu controlador
  });
});
