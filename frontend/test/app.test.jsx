import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../src/App";

test("Renderiza correctamente el componente App", () => {
  render(<App />);
  const main = screen.getByRole("main"); // 👈 limitar búsqueda
  const button = within(main).getByRole("button", { name: /analizar/i });
  expect(button).toBeInTheDocument();
});
