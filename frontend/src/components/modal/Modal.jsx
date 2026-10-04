import ModalOverlay from './ModalOverlay';
import './modal.css';

function Modal({ message, deleteFunction, closeModal }) {
    return (
        <ModalOverlay>
            <p>{message}</p>

            {deleteFunction &&
                <div className="delete-actions">
                    <button className="yes-button" onClick={deleteFunction}>Yes</button>
                    <button className="no-button" onClick={closeModal}>No</button>
                </div>
            }
        </ModalOverlay>
    );
}

export default Modal;