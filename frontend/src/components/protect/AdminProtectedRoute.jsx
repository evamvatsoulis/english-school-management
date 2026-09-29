import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/auth";

function AdminProtectedRoute({ children }) {
    const user = getUserFromToken();

    if (user?.role !== "admin") {
        return <Navigate to="/students" replace />;
    }
    return children;
}

export default AdminProtectedRoute;