const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

export const getStudents = async () => {
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