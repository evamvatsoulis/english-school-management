import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Students from "./pages/Students";
import StudentDetails from './pages/StudentDetails';
import Classes from './pages/Classes';
import ClassDetails from "./pages/ClassDetails";
import Payments from './pages/Payments';
import Health from './pages/Health';
import Users from "./pages/Users";
import Enrollments from "./pages/Enrollments";
import ProtectedRoute from "./components/protect/ProtectedRoute";
import LoginProtectedRoute from "./components/protect/LoginProtectedRoute";
import AdminProtectedRoute from "./components/protect/AdminProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={
        token ? <Navigate to="/students" replace />
          : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginProtectedRoute><Login /></LoginProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/students/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
      <Route path="/classes/:id" element={<ProtectedRoute><ClassDetails /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/health" element={<ProtectedRoute><AdminProtectedRoute><Health /></AdminProtectedRoute></ProtectedRoute>} />
      <Route path="/enrollments" element={<ProtectedRoute><AdminProtectedRoute><Enrollments /></AdminProtectedRoute></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><AdminProtectedRoute><Users /></AdminProtectedRoute></ProtectedRoute>} />
    </Routes>
  );
}

export default App;