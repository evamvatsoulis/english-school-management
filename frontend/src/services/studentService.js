const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

const getStudents = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_GATEWAY_URL}/students`,
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

    const response = await fetch(`${API_GATEWAY_URL}/students/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const createStudent = async (studentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/students`,
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
        `${API_GATEWAY_URL}/students/${studentId}`,
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
        `${API_GATEWAY_URL}/students/${studentId}/deactivate`,
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

export { getStudents, getStudentById, createStudent, updateStudent, deactivateStudent };