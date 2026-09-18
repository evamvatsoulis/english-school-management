import { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent } from "../services/studentService";
import Sidebar from "../components/Sidebar";
import StudentsList from '../components/students/StudentsList';
import StudentForm from '../components/students/StudentForm';
import '../styles/pages/Students.css'

function Students() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addStudentError, setAddStudentError] = useState("");
    const [editStudentError, setEditStudentError] = useState("");

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
        closeForm();
    };

    const editStudent = async (studentData) => {
        const response = await updateStudent(selectedStudent.id, studentData);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setEditStudentError(response.data.error);
            return;
        }
        setStudents(students.map((student) => student.id === response.data.id ? response.data : student));
        console.log(response.data);
        closeForm();
    };

    const openCreateForm = () => {
        setSelectedStudent(null);
        setShowForm(true);
    };

    const openEditForm = (student) => {
        setSelectedStudent(student);
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

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
                                closeForm={closeForm}
                                selectedStudent={selectedStudent}
                                editStudent={editStudent}
                            />
                        </div>
                    </div>
                )}

                {!loadStudentsError && <StudentsList
                    students={students}
                    openEditForm={openEditForm}
                />}
            </div>
        </div>
    );
}

export default Students;