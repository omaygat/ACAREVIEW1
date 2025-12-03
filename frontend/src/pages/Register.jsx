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

      if (role === "estudiante") navigate("/analizador");
      else if (role === "docente") navigate("/teacher");
      else navigate("/");

    } catch (e) {
      alert(e.response?.data.error || "Error registrando usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Crear Cuenta
        </h1>

        {/* Nombre */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Nombre</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Apellidos */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Apellidos</label>
          <input
            type="text"
            placeholder="Ingresa tus apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Correo</label>
          <input
            type="email"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Rol */}
        <div className="mb-6">
          <label className="text-gray-700 font-medium">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl
                       bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg 
                       hover:bg-blue-700 transition-all shadow-md"
          >
            Registrarse
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gray-200 text-gray-900 py-3 rounded-full font-semibold text-lg 
                       hover:bg-gray-300 transition-all"
          >
            Volver
          </button>
        </div>

      </div>
    </div>
  );
}
