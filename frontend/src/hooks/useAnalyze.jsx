import { useState } from "react";

export default function useAnalyze() {
  const [text, setText] = useState("");
  return { text, setText };
}
