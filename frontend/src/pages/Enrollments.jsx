import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnrollments } from '../services/enrollmentService';
import { getStudentsByIds } from '../services/studentService';
import PageLayout from '../components/PageLayout/PageLayout';
import EnrollmentsTable from '../components/tables/EnrollmentsTable/EnrollmentsTable';

function Enrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [loadEnrollmentsError, setLoadEnrollmentsError] = useState("");
    const [loadStudentsByIdsError, setLoadStudentsByIdsError] = useState("");
    const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
    const [studentsLoading, setStudentsLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadEnrollments = async () => {
        setLoadEnrollmentsError("");
        setEnrollmentsLoading(true);

        const response = await getEnrollments();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadEnrollmentsError(response.data.error);
            console.error(response.data.error);
            setEnrollmentsLoading(false);
            return;
        }

        console.log(response.data.message);
        setEnrollments(response.data.result);
        setEnrollmentsLoading(false);
        loadStudentsByIds(response.data.result);
    };

    const loadStudentsByIds = async (enrollments) => {
        setLoadStudentsByIdsError("");
        setStudentsLoading(true);

        const studentsIds = enrollments.map((enrollment) => enrollment.student_id);

        const response = await getStudentsByIds(studentsIds);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadStudentsByIdsError(response.data.error);
            console.error(response.data.error);
            setStudentsLoading(false);
            return;
        }

        console.log(response.data.message);
        setStudents(response.data.result);
        setStudentsLoading(false);
    };

    useEffect(() => {
        loadEnrollments();
    }, [])

    return (
        <PageLayout>
            <h1>Enrollments 2026-2027</h1>

            {enrollmentsLoading ? <p>Loading enrollments...</p> :
                studentsLoading ? <p>Loading students...</p> :
                    !loadEnrollmentsError && !loadStudentsByIdsError &&
                    <EnrollmentsTable
                        enrollments={enrollments}
                        students={students}
                    />
            }
        </PageLayout>
    );
}

export default Enrollments;