import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetails from './pages/StudentDetails';
import Classes from './pages/Classes';
import ClassDetails from "./pages/ClassDetails";
import ProtectedRoute from "./components/protect/ProtectedRoute";
import LoginProtectedRoute from "./components/protect/LoginProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={
        token ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginProtectedRoute><Login /></LoginProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/students/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
      <Route path="/classes/:id" element={<ProtectedRoute><ClassDetails /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;