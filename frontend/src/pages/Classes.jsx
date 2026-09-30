import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClasses, createClass, updateClass, deactivateClass } from '../services/classService';
import { classColumns } from '../config/config';
import DataTable from '../components/tables/DataTable/DataTable';
import ClassForm from '../components/forms/ClassForm';
import Modal from '../components/modal/Modal';
import ModalOverlay from '../components/modal/ModalOverlay';
import PageLayout from '../components/PageLayout/PageLayout';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadClassesError, setLoadClassesError] = useState("");
    const [addClassError, setAddClassError] = useState("");
    const [editClassError, setEditClassError] = useState("");
    const [deleteClassError, setDeleteClassError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUnauthorizedError = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };

    const loadClasses = async () => {
        setLoadClassesError("");
        setLoading(true);
        setClasses([]);

        const response = await getClasses();

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setLoadClassesError(response.data.error);
            setLoading(false);
            return;
        }

        setClasses(response.data.result);
        console.log(response.data.message);
        setLoading(false);
    };

    const addClass = async (classData) => {
        setAddClassError("");

        const response = await createClass(classData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setAddClassError(response.data.error);
            return;
        }

        loadClasses();
        closeForm();
        console.log(response.data.message);
    };

    const editClass = async (classData) => {
        setEditClassError("");

        const response = await updateClass(selectedClass.id, classData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            console.error(response.data.error);
            setEditClassError(response.data.error);
            return;
        }

        loadClasses();
        closeForm();
        console.log(response.data.message);
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

        console.log(response.data.message);
        loadClasses();
        setShowDeleteModal(false);
    };

    const openCreateForm = () => {
        setSelectedClass(null);
        setShowForm(true);
    };

    const openEditForm = (subject) => {
        setSelectedClass(subject);
        setShowForm(true);
    };

    const openDeleteModal = (subject) => {
        setSelectedClass(subject);
        setShowDeleteModal(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditClassError("");
        setAddClassError("");
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedClass(null);
    };

    const navigateToClassDetails = (subject) => navigate(`/classes/${subject.id}`);

    const handleSubmit = (classData) => {
        selectedClass ? editClass(classData) :
            addClass(classData);
    };

    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <PageLayout>
            <h1>Classes</h1>

            {!loadClassesError &&
                <div className="page-actions">
                    <button className="add-button" onClick={openCreateForm}>Add new class</button>
                </div>
            }

            {loading ? <p>Loading...</p> : !loadClassesError &&
                <DataTable
                    columns={classColumns}
                    data={classes}
                    actions={[
                        { label: "edit", function: openEditForm },
                        { label: "eye_tracking", function: navigateToClassDetails },
                        { label: "delete", function: openDeleteModal }
                    ]}
                />
            }

            {showForm && (
                <ModalOverlay>
                    <ClassForm
                        selectedClass={selectedClass}
                        closeForm={closeForm}
                        onSubmit={handleSubmit}
                        formError={selectedClass ? editClassError : addClassError}
                    />
                </ModalOverlay>
            )}

            {showDeleteModal && (
                <Modal
                    message={"Are you sure you want to delete this class ?"}
                    deleteFunction={deleteClass}
                    closeModal={closeDeleteModal}
                />
            )}
        </PageLayout>
    );
}

export default Classes;