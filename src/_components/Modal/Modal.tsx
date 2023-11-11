import React from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void;
    show: boolean;
    children?: React.ReactNode;
    onContentChange?: () => void;
}
const Modal: React.FC<ModalProps> = ({ onClose, show, children }) => {
    if (!show) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();  // Empêche la propagation de l'événement
    };

    const alertOnClose = () => {
        console.log("Are you sure ?");
        if (!window.confirm("Etes-vous sûr de vouloir quitter ? Les modifications non enregistrées seront perdues.")){
            // console.log("Stay")
        } else {
            onClose();
            // console.log("Quit")
        }
    }

    return (
        <div className="modalOverlay" onClick={alertOnClose}>
            <div className="modalContent" onClick={handleContentClick}>
                <button className={"btn btn-close btn-danger btn-close-position"} onClick={onClose}></button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
