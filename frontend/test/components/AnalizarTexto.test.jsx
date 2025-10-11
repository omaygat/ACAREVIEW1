import React from "react";
import { render, screen } from "@testing-library/react";
import AnalizarTexto from "../../src/components/AnalizarTexto";

// Mock del hook o contexto si es necesario
jest.mock("../../src/context/TextoContext", () => ({
  useTextoContext: () => ({
    analizarTexto: jest.fn(),
  }),
}));

test("muestra botón Analizar Texto", () => {
  render(<AnalizarTexto />);
  expect(screen.getByText(/analizar/i)).toBeInTheDocument();
});
