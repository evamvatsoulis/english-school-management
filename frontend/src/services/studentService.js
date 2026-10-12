import { apiGatewayUrl } from "../config/config";

const getStudents = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/students`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const getStudentById = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/students/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const getStudentsByIds = async (studentsIds) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/students/batch`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ studentsIds })
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const createStudent = async (studentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/students`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(studentData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const updateStudent = async (studentId, studentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/students/${studentId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(studentData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const deactivateStudent = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/students/${studentId}/deactivate`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getStudents, getStudentById, getStudentsByIds, createStudent, updateStudent, deactivateStudent };