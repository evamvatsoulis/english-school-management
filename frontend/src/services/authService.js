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