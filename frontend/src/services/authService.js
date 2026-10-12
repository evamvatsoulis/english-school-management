import { apiGatewayUrl } from "../config/config";

export const login = async (username, password) => {
    const response = await fetch(`${apiGatewayUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export const getUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/auth/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export const register = async (userData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export const updateUser = async (userId, userData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/auth/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};