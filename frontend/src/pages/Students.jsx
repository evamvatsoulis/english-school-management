import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, createStudent, updateStudent, deactivateStudent, getStudentsByIds } from "../services/studentService";
import { getClasses } from '../services/classService';
import { getEnrollmentsByClass } from '../services/enrollmentService';
import { studentColumns } from '../config/config';
import StudentForm from '../components/forms/StudentForm';
import Modal from '../components/Modal/Modal';
import DataTable from '../components/tables/DataTable/DataTable';
import Filter from '../components/Filter/Filter';
import PageLayout from '../components/PageLayout/PageLayout';

function Students() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addStudentError, setAddStudentError] = useState("");
    const [editStudentError, setEditStudentError] = useState("");
    const [deactivateStudentError, setDeactivateStudentError] = useState("");
    const [loadClassesError, setLoadClassesError] = useState("");
    const [loadEnrollmentsByClassError, setLoadEnrollmentsByClassError] = useState("");
    const [loadStudentsByClassError, setLoadStudentsByClassError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadStudents = async () => {
        setLoading(true);
        setLoadStudentsError("");
        setStudents([]);

        const response = await getStudents();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadStudentsError(response.data.error);
            setLoading(false);
            return;
        }

        setStudents(response.data.result);
        console.log(response.data.message);
        setLoading(false);
    };

    const addStudent = async (studentData) => {
        setAddStudentError("");

        const response = await createStudent(studentData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setAddStudentError(response.data.error);
            return;
        }

        console.log(response.data.message);

        selectedClassId ? loadEnrollmentsByClass(selectedClassId) :
            loadStudents();
        closeForm();
    };

    const editStudent = async (studentData) => {
        setEditStudentError("");

        const response = await updateStudent(selectedStudent.id, studentData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setEditStudentError(response.data.error);
            return;
        }

        console.log(response.data.message);

        loadStudents();
        closeForm();
    };

    const deleteStudent = async () => {
        const response = await deactivateStudent(selectedStudent.id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setDeactivateStudentError(response.data.error);
            return;
        }

        console.log(response.data.message);
        closeDeleteModal();
        selectedClassId ? loadEnrollmentsByClass(selectedClassId) :
            loadStudents();
    };

    const loadClasses = async () => {
        setLoadClassesError("");

        const response = await getClasses();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadClassesError(response.data.error);
            return;
        }

        setClasses(response.data.result);
    };

    const loadEnrollmentsByClass = async (classId) => {
        setStudents([]);
        const response = await getEnrollmentsByClass(classId);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadEnrollmentsByClassError(response.data.error);
            return;
        }

        loadStudentsByClass(response.data.result);
        console.log(response.data.message);
    };

    const loadStudentsByClass = async (enrollments) => {
        const studentsIds = enrollments.map((enrollment) => enrollment.student_id);
        const response = await getStudentsByIds(studentsIds);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadStudentsByClassError(response.data.error);
            console.error(response.data.error);
            return;
        }

        setStudents(response.data.result);
        console.log(response.data.message);
    };

    const handleSubmit = (studentData) => {
        selectedStudent ? editStudent(studentData) :
            addStudent(studentData);
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

    const openDeleteModal = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedStudent(null);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedStudent(null);
        setAddStudentError("");
        setEditStudentError("");
    };

    const navigateToStudentDetails = (student) => navigate(`/students/${student.id}`);

    useEffect(() => {
        loadStudents();
        loadClasses();
    }, [])

    return (
        <PageLayout>
            <h1>Students</h1>

            <div className="page-actions">
                <Filter
                    data={loadClassesError ? [] : classes}
                    item={"class"}
                    handleFilter={handleFilter}
                />

                <button className="add-button" onClick={openCreateForm}>Add new student</button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <StudentForm
                            selectedStudent={selectedStudent}
                            closeForm={closeForm}
                            formError={selectedStudent ? editStudentError : addStudentError}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}

            {loading ? <p>Loading...</p> :
                !loadStudentsError &&
                <DataTable
                    columns={studentColumns}
                    data={students}
                    actions={[
                        { label: "edit", function: openEditForm },
                        { label: "eye_tracking", function: navigateToStudentDetails },
                        { label: "delete", function: openDeleteModal }
                    ]}
                />
            }

            {showDeleteModal && (
                <Modal
                    message={"Are you sure you want to delete this student ?"}
                    deleteFunction={deleteStudent}
                    closeModal={closeDeleteModal}
                />
            )}
        </PageLayout>
    );
}

export default Students;