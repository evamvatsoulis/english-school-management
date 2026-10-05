import { NavLink, useNavigate } from "react-router-dom";
import { getUserFromToken } from '../../utils/auth';
import './Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <h2>English School</h2>

            <nav className="sidebar-nav">
                <NavLink to="/students">Students</NavLink>
                <NavLink to="/classes">Classes</NavLink>
                <NavLink to="/payments">Payments</NavLink>
                {user?.role === "admin" &&
                    <>
                        <NavLink to="/healths">Healths</NavLink>
                        <NavLink to="/users">Users</NavLink>
                    </>
                }
            </nav>

            <button className="sidebar-logout"><span className="material-symbols-outlined" onClick={handleLogout}>logout</span></button>
        </aside>
    );
}

export default Sidebar;