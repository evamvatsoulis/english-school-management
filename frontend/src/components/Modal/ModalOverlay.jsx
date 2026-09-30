import './modal.css';

function ModalOverlay({ children }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}

export default ModalOverlay;