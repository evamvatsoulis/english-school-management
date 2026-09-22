import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, createStudent, updateStudent, deactivateStudent } from "../services/studentService";
import { getClasses } from '../services/classService';
import { getEnrollmentsByClass } from '../services/enrollmentService';
import { studentColumns } from '../config/config';
import Sidebar from "../components/Sidebar";
import StudentForm from '../components/StudentForm';
import DeleteMessage from '../components/DeleteMessage';
import DataTable from '../components/DataTable';
import Filter from '../components/Filter';
import '../styles/pages/Students.css';

function Students() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addStudentError, setAddStudentError] = useState("");
    const [editStudentError, setEditStudentError] = useState("");
    const [deactivateStudentError, setDeactivateStudentError] = useState("");
    const [loadClassesError, setLoadClassesError] = useState("");
    const [loadEnrollmentsByClassError, setLoadEnrollmentsByClassError] = useState("");

    const navigate = useNavigate();

    const loadStudents = async () => {
        const response = await getStudents();
        if (response.status === 401) {
            localStorage.removeItem("token");
            navigate('/login');
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadStudentsError(response.data.error);
            return;
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
        
        selectedClassId ? loadEnrollmentsByClass(selectedClassId) :
        loadStudents();
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
        setStudents((currentStudents) => currentStudents.map((student) => student.id === response.data.id ? response.data : student));
        closeForm();
    };

    const deleteStudent = async () => {
        const response = await deactivateStudent(selectedStudent.id);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setDeactivateStudentError(response.data.error);
            return;
        }
        closeDeleteMessage();
        loadStudents();
    };

    const loadClasses = async () => {
        const response = await getClasses();
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadClassesError(response.data.error);
            return;
        }
        setClasses(response.data);
    };

    const loadEnrollmentsByClass = async (classId) => {
        setStudents([]);
        const response = await getEnrollmentsByClass(classId);

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadEnrollmentsByClassError(response.data.error);
            return;
        }
        setStudents(response.data);
    };

    const handleFilter = (classId) => {
        if (classId === "--") {
            setSelectedClassId(null);
            loadStudents();
        } else {
            setSelectedClassId(classId);
            loadEnrollmentsByClass(classId);
        }
    };

    const openCreateForm = () => {
        setSelectedStudent(null);
        setShowForm(true);
    };

    const openEditForm = (student) => {
        setSelectedStudent(student);
        setShowForm(true);
    };

    const openDeleteMessage = (student) => {
        setSelectedStudent(student);
        setShowDeleteMessage(true);
    };

    const closeDeleteMessage = () => setShowDeleteMessage(false);

    const closeForm = () => setShowForm(false);

    const navigateToStudentDetails = (student) => navigate(`/students/${student.id}`);

    useEffect(() => {
        loadStudents();
        loadClasses();
    }, [])

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                <h1>Students</h1>

                <div className="page-actions">
                    {classes &&
                        <Filter
                            data={classes}
                            item={"class"}
                            handleFilter={handleFilter}
                        />
                    }

                    <button className="add-button" onClick={openCreateForm}>Add new student</button>
                </div>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <StudentForm
                                addStudent={addStudent}
                                editStudent={editStudent}
                                selectedStudent={selectedStudent}
                                closeForm={closeForm}
                            />
                        </div>
                    </div>
                )}

                {!loadStudentsError &&
                    <DataTable
                        columns={studentColumns}
                        data={students}
                        actions={[
                            { label: "edit", function: openEditForm },
                            { label: "eye_tracking", function: navigateToStudentDetails },
                            { label: "delete", function: openDeleteMessage }
                        ]}
                    />
                }

                {showDeleteMessage && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <DeleteMessage
                                deleteFunction={deleteStudent}
                                closeDeleteMessage={closeDeleteMessage}
                                item={"student"}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Students;