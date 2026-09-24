import { Navigate } from "react-router-dom";

function LoginProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/students" replace />;
    }
    return children;
}

export default LoginProtectedRoute;