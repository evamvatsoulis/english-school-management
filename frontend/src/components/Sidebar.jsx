import { NavLink, useNavigate } from "react-router-dom";
import '../styles/components/Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <h2>English School</h2>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/students">Students</NavLink>
                <NavLink to="/classes">Classes</NavLink>
            </nav>

            <button className="sidebar-logout"><span className="material-symbols-outlined" onClick={handleLogout}>logout</span></button>
        </aside>
    );
}

export default Sidebar;