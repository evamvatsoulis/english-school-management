import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getClassById } from '../services/classService';
import { getEnrollmentsByClass, createEnrollment, deleteEnrollment } from '../services/enrollmentService';
import { getStudents } from '../services/studentService';
import { studentColumns } from '../config/config';
import Sidebar from '../components/Sidebar';
import DataTable from "../components/DataTable";
import DeleteMessage from '../components/DeleteMessage';
import '../styles/components/select.css';

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
    const [loadStudentsError, setLoadStudentsError] = useState("");
    const [addEnrollmentError, setAddEnrollmentError] = useState("");
    const [removeEnrollmentError, setRemoveEnrollmentError] = useState("");

    const loadClass = async () => {
        const response = await getClassById(id);

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            setLoadClassError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setSubject(response.data);
    };

    const loadEnrollmentsByClass = async () => {
        const response = await getEnrollmentsByClass(id);

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            setLoadEnrollmentsByClassError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setEnrollments(response.data);
    };

    const loadStudents = async () => {
        const response = await getStudents();

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            setLoadStudentsError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setStudents(response.data);
    };

    const addEnrollment = async (studentId) => {
        const response = await createEnrollment({ studentId, classId });

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            setAddEnrollmentError(response.data.error);
            console.error(response.data.error);
            return;
        }
        loadEnrollmentsByClass();
    };

    const removeEnrollment = async () => {
        const response = await deleteEnrollment(classId, selectedEnrollment.id);

        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            setRemoveEnrollmentError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setEnrollments((currentEnrollments) => currentEnrollments.filter(
            (currentStudent) => currentStudent.id !== selectedEnrollment.id
        ));
        closeDeleteMessage();
    };

    const openDeleteMessage = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setShowDeleteMessage(true);
    };

    const closeDeleteMessage = () => setShowDeleteMessage(false);

    useEffect(() => {
        loadClass();
        loadEnrollmentsByClass();
        loadStudents();
    }, [id]);

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                {subject && <h1>{subject.name} | {subject.school_year}</h1>}

                {enrollments &&
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

                <div className="select-section">
                    <label htmlFor="student">Select student:</label>
                    <select id="student" onChange={(event) => setSelectedStudentId(event.target.value)}>
                        <option value="--" key="--">--</option>
                        {students.map((student) => (
                            <option value={student.id} key={student.id}>{student.first_name} {student.last_name}</option>
                        ))}
                    </select>
                </div>

                <button className="add-button" onClick={() => addEnrollment(selectedStudentId)}>Add student to class</button>
            </div>
        </div>
    );
}

export default ClassDetails;