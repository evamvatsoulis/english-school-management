const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

const getClasses = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_GATEWAY_URL}/classes`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const createClass = async (classData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/classes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(classData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const updateClass = async (classId, classData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/classes/${classId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(classData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getClasses, createClass, updateClass };