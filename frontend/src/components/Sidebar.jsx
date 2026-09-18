import { NavLink, useNavigate } from "react-router-dom";
import '../styles/components/sidebar.css';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <h2>English School</h2>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/students">
                    Students
                </NavLink>

                <NavLink to="/classes">
                    Classes
                </NavLink>

                <NavLink to="/payments">
                    Payments
                </NavLink>
            </nav>

            <button
                className="sidebar-logout"
                onClick={handleLogout}
            >
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;