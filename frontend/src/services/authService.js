const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

export const login = async (username, password) => {
    const response = await fetch(`${API_GATEWAY_URL}/auth/login`, {
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

    const response = await fetch(`${API_GATEWAY_URL}/auth/users`,
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

    const response = await fetch(`${API_GATEWAY_URL}/auth/register`, {
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