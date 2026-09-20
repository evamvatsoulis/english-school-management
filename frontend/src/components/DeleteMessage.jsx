import '../styles/components/DeleteMessage.css';
function DeleteMessage({ deleteStudent, closeDeleteMessage }) {
    return (
        <>
            <div className="delete-message">
                <p>Are you sure you want to delete this student ?</p>
            </div>
            <div className="delete-actions">
                <button className="yes-button" onClick={deleteStudent}>Yes</button>
                <button className="no-button" onClick={closeDeleteMessage}>No</button>
            </div>
        </>
    )
};

export default DeleteMessage;