import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHealths } from "../services/healthService";
import { healthColumns } from '../config/config';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';



function Healths() {
    const [healths, setHealths] = useState([]);
    const [loadHealthsError, setLoadHealthsError] = useState("");

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const loadHealths = async () => {
        const response = await getHealths();
        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadHealthsError(response.data.error);
            return;
        }

        setHealths(response.data);
        setLoadHealthsError("");
    };

    useEffect(() => {
        loadHealths();
        const interval = setInterval(loadHealths, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="page-layout">
            <div className="page-content">
                <Sidebar />

                {!loadHealthsError &&
                    <DataTable
                        columns={healthColumns}
                        data={healths}
                        title={"Health"}
                    />
                }
            </div>
        </div>
    )
}

export default Healths;