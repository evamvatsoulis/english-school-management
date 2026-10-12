import { apiGatewayUrl } from "../config/config";

export const exportToPdf = async (tableName, columns, tableData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiGatewayUrl}/export/pdf`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tableName, columns, tableData })
    });

    const data = response.ok ? await response.blob() : await response.json();

    return { status: response.status, ok: response.ok, data };
};