import { renderHook, act } from "@testing-library/react";
import useAnalyze from "../src/hooks/useAnalyze.jsx";

test("useAnalyze devuelve estado inicial y permite actualizar texto", async () => {
  const { result } = renderHook(() => useAnalyze());
  expect(result.current.text).toBe("");
  act(() => {
    result.current.setText("Hola mundo");
  });
  expect(result.current.text).toBe("Hola mundo");
});
