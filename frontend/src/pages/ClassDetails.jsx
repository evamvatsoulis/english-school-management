import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getClassById } from '../services/classService';
import { getEnrollmentsByClass, createEnrollment, deleteEnrollment } from '../services/enrollmentService';
import { getStudents, getStudentById, getStudentsByIds } from '../services/studentService';
import { studentColumns } from '../config/config';
import Sidebar from '../components/Sidebar/Sidebar';
import DataTable from "../components/tables/DataTable/DataTable";
import DeleteMessage from '../components/DeleteMessage/DeleteMessage';
import Select from '../components/Select/Select';

function ClassDetails() {
    const { id } = useParams();
    const classId = Number(id);

    const [subject, setSubject] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [showDeleteMessage, setShowDeleteMessage] = useState("");
    const [loadClassError, setLoadClassError] = useState("");
    const [loadEnrollmentsByClassError, setLoadEnrollmentsByClassError] = useState("");
    const [loadStudentsByClassError, setLoadStudentsByClassError] = useState("");
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addEnrollmentError, setAddEnrollmentError] = useState("");
    const [removeEnrollmentError, setRemoveEnrollmentError] = useState("");
    const [classLoading, setClassLoading] = useState(false);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadClass = async () => {
        setClassLoading(true);
        const response = await getClassById(id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadClassError(response.data.error);
            console.error(response.data.error);
            setClassLoading(false);
            return;
        }
        setSubject(response.data.result);
        setLoadClassError("");
        setClassLoading(false);
    };

    const loadEnrollmentsByClass = async () => {
        setEnrollmentsLoading(true);
        setLoadEnrollmentsByClassError("");
        setEnrollments([]);

        const response = await getEnrollmentsByClass(id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadEnrollmentsByClassError(response.data.error);
            console.error(response.data.error);
            setEnrollmentsLoading(false);
            return;
        }
        loadStudentsByClass(response.data.result);
        console.log(response.data.message);
        setEnrollmentsLoading(false);
    };

    const loadStudentsByClass = async (enrollments) => {
        setStudentsLoading(true);

        const studentsIds = enrollments.map((enrollment) => enrollment.student_id);
        const response = await getStudentsByIds(studentsIds);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadStudentsByClassError(response.data.error);
            console.error(response.data.error);
            setStudentsLoading(false);
            return;
        }

        setEnrollments(response.data.result);
        console.log(response.data.message);
        setStudentsLoading(false);
    };

    const loadStudents = async () => {
        setLoadStudentsError("");
        const response = await getStudents();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadStudentsError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setStudents(response.data.result);
    };

    const addEnrollment = async (studentId) => {
        const response = await createEnrollment({ studentId, classId });

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setAddEnrollmentError(response.data.error);
            alert(response.data.error);
            console.error(response.data.error);
            return;
        }
        loadEnrollmentsByClass();
        setAddEnrollmentError("");
        console.log(response.data.message);
    };

    const removeEnrollment = async () => {
        const response = await deleteEnrollment(classId, selectedEnrollment.id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setRemoveEnrollmentError(response.data.error);
            console.error(response.data.error);
            return;
        }

        loadEnrollmentsByClass();
        console.log(response.data.message);
        closeDeleteMessage();
    };

    const openDeleteMessage = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setShowDeleteMessage(true);
    };

    const closeDeleteMessage = () => setShowDeleteMessage(false);

    const handleSelect = (studentId) => setSelectedStudentId(studentId);

    useEffect(() => {
        loadClass();
        loadEnrollmentsByClass();
        loadStudents();
    }, [id]);

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                {classLoading ? <p>Loading class...</p> : subject && !loadClassError && <h1>{subject.name} | {subject.school_year}</h1>}

                {enrollmentsLoading ? <p>Loading enrollments...</p> :
                    studentsLoading ? <p>Loading students...</p> :
                        !loadEnrollmentsByClassError && !loadStudentsByClassError &&
                        <DataTable
                            columns={studentColumns}
                            data={enrollments}
                            title={"Students"}
                            actions={[
                                { label: "delete", function: openDeleteMessage }
                            ]}
                        />
                }

                {showDeleteMessage &&
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <DeleteMessage
                                deleteFunction={removeEnrollment}
                                closeDeleteMessage={closeDeleteMessage}
                                item={"student from this class"}
                            />
                        </div>
                    </div>
                }

                <Select
                    data={!loadStudentsError ? students : []}
                    item={"student"}
                    handleSelect={handleSelect}
                />

                <button className="add-button" onClick={() => addEnrollment(selectedStudentId)}>Add student to class</button>
            </div>
        </div>
    );
}

export default ClassDetails;