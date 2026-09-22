import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getClassById } from '../services/classService';
import { getEnrollmentsByClass } from '../services/enrollmentService';
import { studentColumns } from '../config/config';
import Sidebar from '../components/Sidebar';
import DataTable from "../components/DataTable";

function ClassDetails() {
    const { id } = useParams();

    const [subject, setSubject] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loadClassError, setLoadClassError] = useState("");
    const [loadEnrollmentsByClassError, setLoadEnrollmentsByClassError] = useState("");

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
            setLoadClassError(response.data.error);
            console.error(response.data.error);
            return;
        }
        setEnrollments(response.data);
    };

    useEffect(() => {
        loadClass();
        loadEnrollmentsByClass();
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
                    />
                }
            </div>
        </div>
    );
}

export default ClassDetails;