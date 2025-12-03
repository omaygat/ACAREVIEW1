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

      if (data.user.role === "estudiante") navigate("/student");
      else if (data.user.role === "docente") navigate("/teacher");
      else navigate("/");
    } catch (e) {
      alert(e.response?.data.error || "Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Iniciar Sesión
        </h1>

        {/* INPUT EMAIL */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Correo</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* INPUT PASSWORD */}
        <div className="mb-6">
          <label className="text-gray-700 font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* BOTONES */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg 
                       hover:bg-blue-700 transition-all shadow-md"
          >
            Ingresar
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-900 py-3 rounded-full font-semibold text-lg 
                       hover:bg-gray-300 transition-all"
          >
            Volver
          </button>
        </div>

        {/* REGISTRO */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes cuenta?
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-2 text-blue-600 font-semibold hover:underline"
          >
            Registrarse
          </button>
        </div>

      </div>
    </div>
  );
}
