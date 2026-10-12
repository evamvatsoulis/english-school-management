import { apiGatewayUrl } from "../config/config";

const getClasses = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/classes`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const getClassById = async (classId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/classes/${classId}`,
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
        `${apiGatewayUrl}/classes`,
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
        `${apiGatewayUrl}/classes/${classId}`,
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

const deactivateClass = async (classId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${apiGatewayUrl}/classes/${classId}/deactivate`,
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

export { getClasses, getClassById, createClass, updateClass, deactivateClass };