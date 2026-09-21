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

const createPayment = async (paymentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/payments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const updatePayment = async (paymentId, paymentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/students/${paymentId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const deletePayment = async (paymentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_GATEWAY_URL}/payments/${paymentId}`,
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

export { getPaymentsByStudentId, createPayment, updatePayment, deletePayment };