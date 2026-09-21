import '../styles/components/DeleteMessage.css';
function DeleteMessage({ deleteStudent, removePayment, closeDeleteMessage, item }) {
    return (
        <>
            <div className="delete-message">
                <p>Are you sure you want to delete this {item} ?</p>
            </div>
            <div className="delete-actions">
                {deleteStudent ?
                    <button className="yes-button" onClick={deleteStudent}>Yes</button> :
                    <button className="yes-button" onClick={removePayment}>Yes</button>
                }
                <button className="no-button" onClick={closeDeleteMessage}>No</button>
            </div>
        </>
    )
};

export default DeleteMessage;