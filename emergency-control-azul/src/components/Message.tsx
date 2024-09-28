import React from 'react';

interface MessageProps {
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ type, message, onClose }) => {
    return (
        <div className={`alert alert-${type === 'success' ? 'success' : 'danger'}`} role="alert">
            {message}
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Message;