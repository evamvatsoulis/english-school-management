import { useEffect, useState } from 'react';
import { getClasses } from '../services/classService';
import { classColumns } from '../config/config';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [loadClassesError, setLoadClassesError] = useState("");
    const [showForm, setShowForm] = useState(false);

    const loadClasses = async () => {
        const response = await getClasses();
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadClassesError(response.data.error);
            return;
        }
        setClasses(response.data);
    };

    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                {classes &&
                    <DataTable
                        columns={classColumns}
                        data={classes}
                        title={"Classes"}
                    />
                }
            </div>
        </div>
    );
}

export default Classes;