import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, register, updateUser, deleteUser } from "../services/authService";
import { userColumns } from "../config/config";
import PageLayout from "../components/PageLayout/PageLayout";
import DataTable from '../components/tables/DataTable/DataTable';
import ModalOverlay from '../components/modal/ModalOverlay';
import UserForm from "../components/forms/UserForm";
import Modal from "../components/modal/Modal";

function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadUsersError, setLoadUsersError] = useState("");
    const [createUserError, setCreateUserError] = useState("");
    const [editUserError, setEditUserError] = useState("");
    const [removeUserError, setRemoveUserError] = useState("");
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

    const createUser = async (userData) => {
        setCreateUserError("");

        const response = await register(userData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setCreateUserError(response.data.error);
            console.error(response.data.error);
            return;
        }

        console.log(response.data.message);
        closeForm();
        loadUsers();
    };

    const editUser = async (userId, userData) => {
        setEditUserError("");

        const response = await updateUser(userId, userData);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setEditUserError(response.data.error);
            console.error(response.data.error);
            return;
        }

        console.log(response.data.message);
        closeForm();
        loadUsers();
    };

    const removeUser = async () => {
        setRemoveUserError("");

        const response = await deleteUser(selectedUser.id);

        if (response.status === 401) {
            handleUnauthorizedError();
            return;
        }

        if (!response.ok) {
            setRemoveUserError(response.data.error);
            console.error(response.data.error);
            return;
        }

        console.log(response.data.message);
        closeDeleteModal();
        loadUsers();
    };

    const handleSubmit = (userData) => {
        selectedUser ? editUser(selectedUser.id, userData) :
            createUser(userData);
    };

    const openForm = (user) => {
        setShowForm(true);
        setSelectedUser(user);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedUser(null);
        setCreateUserError("");
        setEditUserError("");
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setShowDeleteModal(false);
    };

    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <PageLayout>
            <h1>Users</h1>

            <div className="page-actions">
                <button className="add-button" onClick={() => openForm()}>Add new user</button>
            </div>

            {showForm &&
                <ModalOverlay>
                    <UserForm
                        selectedUser={selectedUser}
                        closeForm={closeForm}
                        formError={selectedUser ? editUserError : createUserError}
                        onSubmit={handleSubmit}
                    />
                </ModalOverlay>}

            {loading ? <p>Loading...</p> :
                !loadUsersError &&
                <DataTable
                    columns={userColumns}
                    data={users}
                    actions={[
                        { label: "edit", function: openForm },
                        { label: "delete", function: openDeleteModal }
                    ]}
                />
            }

            {showDeleteModal &&
                <Modal
                    message={"Are you sure you want to delete this user ?"}
                    deleteFunction={removeUser}
                    closeModal={closeDeleteModal}
                />
            }

        </PageLayout>
    );
}

export default Users;