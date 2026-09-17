import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getStudents } from "../services/studentService";
import '../styles/dashboard.css'

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadStudents = async () => {
        const response = await getStudents();
        if (!response.ok) {
            console.error(response.data.error);
            setError(response.data.error);
        }
        setStudents(response.data);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        loadStudents();
    }, [])

    return (
        <div className="dashboard">
            <h1 className="dashboard-header">Dashboard</h1>

            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            <div className="dashboard-content">

                <h2>Students</h2>
                <div className="students-list">
                    {!error && students.map((student) => (
                        <div className="student-card" key={student.id}>
                            {student.first_name} {student.last_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;