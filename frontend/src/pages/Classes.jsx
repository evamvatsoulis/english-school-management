import { useEffect, useState } from 'react';
import { getClasses, createClass, updateClass } from '../services/classService';
import { classColumns } from '../config/config';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';
import ClassForm from '../components/ClassForm';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loadClassesError, setLoadClassesError] = useState("");
    const [addClassError, setAddClassError] = useState("");
    const [editClassError, setEditClassError] = useState("");

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

    const addClass = async (classData) => {
        const response = await createClass(classData);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setAddClassError(response.data.error);
            return;
        }
        setClasses((currentClasses) => [...currentClasses, response.data]);
        closeForm();
    };

    const editClass = async (classData) => {
        const response = await updateClass(selectedClass.id, classData);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadClassesError(response.data.error);
            return;
        }
        setClasses((currentClasses) => currentClasses.map((subject) => subject.id === response.data.id ? response.data : subject));
        closeForm();
    };

    const openCreateForm = () => {
        setSelectedClass(null);
        setShowForm(true);
    };

    const openEditForm = (subject) => {
        setSelectedClass(subject);
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <div className="page-layout">
            <Sidebar />

            <div className="page-content">
                <h1>Classes</h1>

                <div className="page-actions">
                    <button className="add-button" onClick={openCreateForm}>Add new class</button>
                </div>

                {classes &&
                    <DataTable
                        columns={classColumns}
                        data={classes}
                        actions={[
                            { label: "edit", function: openEditForm }
                        ]}
                    />
                }

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <ClassForm
                                addClass={addClass}
                                editClass={editClass}
                                selectedClass={selectedClass}
                                closeForm={closeForm}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Classes;