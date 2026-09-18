import { useEffect, useState } from 'react';
import { getStudents } from "../services/studentService";
import Sidebar from "../components/Sidebar";
import StudentsList from '../components/StudentsList';
import '../styles/pages/students.css'

function Students() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

    const loadStudents = async () => {
        const response = await getStudents();
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setError(response.data.error);
        }
        setStudents(response.data);
    };

    useEffect(() => {
        loadStudents();
    }, [])

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                <h1>Students</h1>

                {!error && <StudentsList students={students} />}
            </div>
        </div>
    );
}

export default Students;