const getHealths = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/health`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return { status: response.status, ok: response.ok, data };
};

export { getHealths };