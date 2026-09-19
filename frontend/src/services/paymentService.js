const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

const getPaymentsByStudentId = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_GATEWAY_URL}/payments/students/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getPaymentsByStudentId };