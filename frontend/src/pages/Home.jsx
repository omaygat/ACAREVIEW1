import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido</h1>

      {/* CORRECTO: dirigir al login */}
      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/register")} style={{ marginLeft: "1rem" }}>
        Registro
      </button>
    </div>
  );
}
