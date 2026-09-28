const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

const getEnrollmentsByStudent = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_GATEWAY_URL}/enrollments/student/${studentId}`,
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

    const response = await fetch(`${API_GATEWAY_URL}/enrollments/class/${classId}`,
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
        `${API_GATEWAY_URL}/enrollments`,
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
        `${API_GATEWAY_URL}/enrollments/class/${classId}/student/${studentId}`,
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

export { getEnrollmentsByStudent, getEnrollmentsByClass, createEnrollment, deleteEnrollment };