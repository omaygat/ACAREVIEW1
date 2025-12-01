import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password
      });

      alert(`Bienvenido ${data.user.name} ${data.user.lastName}`);

      // Redirigir según el rol
      if (data.user.role === "estudiante") navigate("/student");
      else if (data.user.role === "docente") navigate("/teacher");
      else navigate("/");
    } catch (e) {
      alert(e.response?.data.error || "Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <input
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleLogin}>Ingresar</button>

        {/* Ahora sí funciona */}
        <button onClick={() => navigate("/")} style={{ marginLeft: "0.5rem" }}>
          Volver
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <span>¿No tienes cuenta? </span>

        {/* Ahora sí funciona */}
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
}
