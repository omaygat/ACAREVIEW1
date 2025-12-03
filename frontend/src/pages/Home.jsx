import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bienvenido 👋
        </h1>

        <p className="text-gray-600 mb-10">
          Accede a tu cuenta o crea una nueva para continuar
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg 
                       hover:bg-blue-700 transition-all shadow-md"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full bg-gray-200 text-gray-900 py-3 rounded-full font-semibold text-lg
                       hover:bg-gray-300 transition-all"
          >
            Registrarse
          </button>
        </div>

      </div>
    </div>
  );
}
