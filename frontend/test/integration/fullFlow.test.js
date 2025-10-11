beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
});

import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "../../src/App";
import axios from "axios";

jest.mock("axios");

describe("Flujo completo de análisis de texto", () => {
  beforeEach(() => {
    // Mock de la respuesta de la API
    axios.post.mockResolvedValue({
      data: {
        summary: "Resumen simulado",
        correctedText: "Texto corregido",
        citations: { APA: [], IEEE: [] },
        plagiarism: [],
      },
    });
  });

  test("debe escribir texto, hacer clic en Analizar y mostrar resultados", async () => {
    render(<App />);

    const main = screen.getByRole("main");

    // Encuentra el textarea dentro del main
    const textarea = within(main).getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Texto de prueba para analizar." } });

    // Encuentra el botón Analizar
    const button = within(main).getByRole("button", { name: /analizar/i });
    fireEvent.click(button);

    // Espera a que se muestre el resultado de Resumen
    await waitFor(() => {
      const summaryContainers = within(main).getAllByText("Resumen");
      const summaryContainer = summaryContainers.find(c => c.tagName === "H2")?.closest("div");
      expect(within(summaryContainer).getByText("Resumen simulado")).toBeInTheDocument();
    });

    // Cambia a la pestaña Ortografía
    const ortoButton = within(screen.getByRole("aside")).getByText(/Ortografia/i);
    fireEvent.click(ortoButton);

    // Espera a que se muestre el Texto Corregido
    await waitFor(() => {
      const ortoContainer = within(main).getByText(/Texto Corregido/i).closest("div");
      expect(within(ortoContainer).getByText(/Texto corregido/i)).toBeInTheDocument();
    });
  });
});
