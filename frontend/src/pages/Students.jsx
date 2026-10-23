import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, createStudent, updateStudent, deactivateStudent, getStudentsByIds } from "../services/studentService";
import { getClasses } from '../services/classService';
import { getEnrollmentsByClass } from '../services/enrollmentService';
import { exportToPdf } from '../services/exportService';
import { studentColumns } from '../config/config';
import StudentForm from '../components/forms/StudentForm';
import Modal from '../components/modal/Modal';
import ModalOverlay from '../components/modal/ModalOverlay';
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
    const [downloadPdfError, setDownloadPdfError] = useState("");
    const [loading, setLoading] = useState(false);
    const [addStudentLoading, setAddStudentLoading] = useState(false);
    const [editStudentLoading, setEditStudentLoading] = useState(false);
    const [deleteStudentLoading, setDeleteStudentLoading] = useState(false);

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
        setAddStudentLoading(true);

        const response = await createStudent(studentData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setAddStudentError(response.data.error);
            setAddStudentLoading(false);
            return;
        }

        console.log(response.data.message);
        setAddStudentLoading(false);

        selectedClassId ? loadEnrollmentsByClass(selectedClassId) :
            loadStudents();
        closeForm();
    };

    const editStudent = async (studentData) => {
        setEditStudentError("");
        setEditStudentLoading(true);

        const response = await updateStudent(selectedStudent.id, studentData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setEditStudentError(response.data.error);
            setEditStudentLoading(false);
            return;
        }

        console.log(response.data.message);
        setEditStudentLoading(false);

        selectedClassId ? loadEnrollmentsByClass(selectedClassId) :
            loadStudents();
        closeForm();
    };

    const deleteStudent = async () => {
        setDeleteStudentLoading(true);
        const response = await deactivateStudent(selectedStudent.id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setDeactivateStudentError(response.data.error);
            setDeleteStudentLoading(false);
            return;
        }

        console.log(response.data.message);
        setDeleteStudentLoading(false);
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
        setLoadEnrollmentsByClassError("");
        setLoadStudentsByClassError("");
        setStudents([]);
        setLoading(true);
        const response = await getEnrollmentsByClass(classId);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadEnrollmentsByClassError(response.data.error);
            setLoading(false);
            return;
        }

        console.log(response.data.message);
        await loadStudentsByClass(response.data.result);
        setLoading(false);
    };

    const loadStudentsByClass = async (enrollments) => {
        setLoading(true);
        const studentsIds = enrollments.map((enrollment) => enrollment.student_id);
        const response = await getStudentsByIds(studentsIds);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadStudentsByClassError(response.data.error);
            console.error(response.data.error);
            setLoading(false);
            return;
        }

        setStudents(response.data.result);
        console.log(response.data.message);
        setLoading(false);
    };

    const downloadPdf = async (tableName, columns, tableData) => {
        setDownloadPdfError("");

        const response = await exportToPdf(tableName, columns, tableData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            alert(response.data.error);
            setDownloadPdfError(response.data.error);
            return;
        }

        const downloadUrl = URL.createObjectURL(response.data);
        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = `${tableName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    };

    const handleExport = () => {
        const columns = studentColumns;
        const tableData = students;
        const tableName = selectedClassId ? classes.find((subject) => subject.id === Number(selectedClassId)).name + ' 2026-2027' : "Students 2026-2027";

        downloadPdf(tableName, columns, tableData);
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
                    item={"Class"}
                    handleFilter={handleFilter}
                />

                <button className="add-button" onClick={openCreateForm}>Add new student</button>
            </div>

            {showForm && (
                <ModalOverlay>
                    <StudentForm
                        selectedStudent={selectedStudent}
                        closeForm={closeForm}
                        formError={selectedStudent ? editStudentError : addStudentError}
                        onSubmit={handleSubmit}
                        loading={selectedStudent ? editStudentLoading : addStudentLoading}
                    />
                </ModalOverlay>
            )}

            {loading ? <p>Loading...</p> :
                !(selectedClassId ? loadEnrollmentsByClassError || loadStudentsByClassError : loadStudentsError) &&
                <DataTable
                    columns={studentColumns}
                    data={students}
                    actions={[
                        { label: "edit", function: openEditForm },
                        { label: "eye_tracking", function: navigateToStudentDetails },
                        { label: "delete", function: openDeleteModal }
                    ]}
                    handleExport={handleExport}
                />
            }

            {showDeleteModal && (
                <Modal
                    message={"Are you sure you want to delete this student ?"}
                    deleteFunction={deleteStudent}
                    closeModal={closeDeleteModal}
                    loading={deleteStudentLoading}
                />
            )}
        </PageLayout>
    );
}

export default Students;