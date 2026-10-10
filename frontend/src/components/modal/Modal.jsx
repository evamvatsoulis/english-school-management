import ModalOverlay from './ModalOverlay';
import './modal.css';

function Modal({ message, deleteFunction, closeModal, loading }) {
    return (
        <ModalOverlay>
            <p>{message}</p>

            {deleteFunction &&
                <div className="delete-actions">
                    <button className="yes-button" onClick={deleteFunction}>
                        {loading ? <span className="material-symbols-outlined spinner">progress_activity</span> : "Yes"}
                    </button>
                    <button className="no-button" onClick={closeModal}>No</button>
                </div>
            }
        </ModalOverlay>
    );
}

export default Modal;