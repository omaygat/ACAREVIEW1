import { useEffect, useState } from "react";
import api from "../api/api";

export default function Historial() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/history").then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Historial</h2>
      <ul>
        {items.map((h) => (
          <li key={h._id}>
            {h.filename} — {h.resultado?.porcentaje || "Sin datos"}
          </li>
        ))}
      </ul>
    </div>
  );
}
