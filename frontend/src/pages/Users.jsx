import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/authService";
import { userColumns } from "../config/config";
import PageLayout from "../components/PageLayout/PageLayout";
import DataTable from '../components/tables/DataTable/DataTable';

function Users() {
    const [users, setUsers] = useState([]);
    const [loadUsersError, setLoadUsersError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadUsers = async () => {
        setLoadUsersError("");
        setLoading(true);

        const response = await getUsers();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setLoadUsersError(response.data.error);
            console.error(response.data.error);
            setLoading(false);
            return;
        }

        setUsers(response.data.result);
        console.log(response.data.message);
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <PageLayout>
            <h1>Users</h1>

            {loading ? <p>Loading...</p> :
                !loadUsersError &&
                <DataTable
                    columns={userColumns}
                    data={users}
                />
            }
        </PageLayout>
    );
}

export default Users;