import { useEffect, useState } from 'react';
import { getClasses, createClass, updateClass, deactivateClass } from '../services/classService';
import { classColumns } from '../config/config';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';
import ClassForm from '../components/ClassForm';
import DeleteMessage from '../components/DeleteMessage';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [loadClassesError, setLoadClassesError] = useState("");
    const [addClassError, setAddClassError] = useState("");
    const [editClassError, setEditClassError] = useState("");
    const [deleteClassError, setDeleteClassError] = useState("");

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

    const deleteClass = async () => {
        const response = await deactivateClass(selectedClass.id);
        if (response.status === 401) {
            localStorage.removeItem("token");
        }

        if (!response.ok) {
            console.error(response.data.error);
            setDeleteClassError(response.data.error);
            return;
        }
        loadClasses();
        setShowDeleteMessage(false);
    };

    const openCreateForm = () => {
        setSelectedClass(null);
        setShowForm(true);
    };

    const openEditForm = (subject) => {
        setSelectedClass(subject);
        setShowForm(true);
    };

    const openDeleteMessage = (subject) => {
        setSelectedClass(subject);
        setShowDeleteMessage(true);
    }

    const closeForm = () => setShowForm(false);

    const closeDeleteMessage = () => setShowDeleteMessage(false);

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
                            { label: "edit", function: openEditForm },
                            { label: "delete", function: openDeleteMessage }
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

                {showDeleteMessage && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <DeleteMessage
                                deleteFunction={deleteClass}
                                closeDeleteMessage={closeDeleteMessage}
                                item={"class"}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Classes;