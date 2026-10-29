const getPaymentsByStudentId = async (studentId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/payments/students/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const createPayment = async (paymentData, notificationData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `/api/payments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ paymentData, notificationData })
        }
    );
    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

const updatePayment = async (paymentId, paymentData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `/api/payments/${paymentId}`,
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
        `/api/payments/${paymentId}`,
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

const getPayments = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/payments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getPaymentsByStudentId, createPayment, updatePayment, deletePayment, getPayments };