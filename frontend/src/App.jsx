import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={
        token ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;