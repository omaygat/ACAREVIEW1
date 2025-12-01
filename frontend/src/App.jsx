import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardTeacher from "./pages/DashboardTeacher";
import UploadWork from "./pages/UploadWork";
import Analyzer from "./pages/Analyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/student" element={<DashboardStudent />} />
        <Route path="/teacher" element={<DashboardTeacher />} />

        {/* Subida de trabajos */}
        <Route path="/upload" element={<UploadWork />} />

        {/* Analizador IA */}
        <Route path="/analizador" element={<Analyzer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
