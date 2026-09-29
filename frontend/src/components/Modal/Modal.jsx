import './Modal.css';

function Modal({ message, deleteFunction, closeModal }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>

                {deleteFunction &&
                    <div className="delete-actions">
                        <button className="yes-button" onClick={deleteFunction}>Yes</button>
                        <button className="no-button" onClick={closeModal}>No</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Modal;