import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealths } from "../services/healthService";
import { healthColumns } from '../config/config';
import DataTable from '../components/tables/DataTable/DataTable';
import PageLayout from '../components/PageLayout/PageLayout';

function Healths() {
    const [healths, setHealths] = useState([]);
    const [loadHealthsError, setLoadHealthsError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const loadHealths = async () => {
        setLoadHealthsError("");
        setLoading(true);

        const response = await getHealths();
        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadHealthsError(response.data.error);
            setLoading(false);
            return;
        }

        setHealths(response.data);
        setLoading(false);
    };

    useEffect(() => {
        loadHealths();
        const interval = setInterval(loadHealths, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <PageLayout>
            <h1>Health</h1>

            {loading ? <p>Loading...</p> : !loadHealthsError &&
                <DataTable
                    columns={healthColumns}
                    data={healths}
                    isHealthPage={true}
                />
            }
        </PageLayout>
    )
}

export default Healths;