const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

export const exportToPdf = async (tableName, columns, tableData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_GATEWAY_URL}/export/pdf`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tableName, columns, tableData })
    });

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};