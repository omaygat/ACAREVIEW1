import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("estudiante");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/register", {
        name,
        lastName,
        email,
        password,
        role,
      });

      alert("Usuario registrado correctamente");

      // 🔥 Redirección específica según el rol
      if (role === "estudiante") {
        navigate("/analizador");  // AQUI TE MANDA DIRECTO AL ANALYZER
      } else if (role === "docente") {
        navigate("/teacher");
      } else {
        navigate("/");
      }

    } catch (e) {
      alert(e.response?.data.error || "Error registrando usuario");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Registro</h1>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Apellidos"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="estudiante">Estudiante</option>
        <option value="docente">Docente</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Registrarse</button>

      <button onClick={() => navigate("/login")} style={{ marginLeft: "0.5rem" }}>
        Volver
      </button>
    </div>
  );
}
