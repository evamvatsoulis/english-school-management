import { apiGatewayUrl } from "../config/config";

const getEnrollments = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/enrollments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const getEnrollmentsByStudent = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/enrollments/student/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const getEnrollmentsByClass = async (classId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/enrollments/class/${classId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const createEnrollment = async (enrollmentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/enrollments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(enrollmentData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const deleteEnrollment = async (classId, studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/enrollments/class/${classId}/student/${studentId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getEnrollments, getEnrollmentsByStudent, getEnrollmentsByClass, createEnrollment, deleteEnrollment };