import { useEffect, useState } from 'react';
import { getStudents, createStudent } from "../services/studentService";
import Sidebar from "../components/Sidebar";
import StudentsList from '../components/students/StudentsList';
import StudentForm from '../components/students/StudentForm';
import '../styles/pages/students.css'

function Students() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addStudentError, setAddStudentError] = useState("");

    const loadStudents = async () => {
        const response = await getStudents();
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadStudentsError(response.data.error);
        }
        setStudents(response.data);
    };

    const addStudent = async (studentData) => {
        const response = await createStudent(studentData);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setAddStudentError(response.data.error);
            return;
        }
        setStudents([...students, response.data]);
        console.log(response.data);
        setShowForm(false);
    };

    const openCreateForm = () => setShowForm(true);

    const closeCreateForm = () => setShowForm(false);

    useEffect(() => {
        loadStudents();
    }, [])

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                <h1>Students</h1>

                <button className="add-student-button" onClick={openCreateForm}>Add new student</button>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <StudentForm
                                addStudent={addStudent}
                                closeCreateForm={closeCreateForm}
                            />
                        </div>
                    </div>
                )}

                {!loadStudentsError && <StudentsList students={students} />}
            </div>
        </div>
    );
}

export default Students;