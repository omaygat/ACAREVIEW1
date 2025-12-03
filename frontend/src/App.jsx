import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardTeacher from "./pages/DashboardTeacher";
import UploadWork from "./pages/UploadWork";
import Analyzer from "./pages/Analyzer";
import Retroalimentacion from "./pages/Retroalimentacion";
import DetalleTrabajos from "./pages/DetalleTrabajos";
import Historial from "./pages/Historial"; // ← IMPORTAR AQUÍ

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/historial" element={<Historial />} />

        {/* Dashboards */}
        <Route path="/student" element={<DashboardStudent />} />
        <Route path="/teacher" element={<DashboardTeacher />} />

        {/* Subida de trabajos */}
        <Route path="/upload" element={<UploadWork />} />

        {/* Analizador IA */}
        <Route path="/analizador" element={<Analyzer />} />

        {/* Retroalimentación IA */}
        <Route path="/retroalimentacion" element={<Retroalimentacion />} />
        <Route path="/student/analizados" element={<DetalleTrabajos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
