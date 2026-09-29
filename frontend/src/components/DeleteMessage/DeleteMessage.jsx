import './DeleteMessage.css';

function DeleteMessage({ deleteFunction, closeDeleteMessage, item }) {
    return (
        <>
            <div className="delete-message">
                <p>Are you sure you want to delete this {item} ?</p>
            </div>

            <div className="delete-actions">
                <button className="yes-button" onClick={deleteFunction}>Yes</button>
                <button className="no-button" onClick={closeDeleteMessage}>No</button>
            </div>
        </>
    )
};

export default DeleteMessage;