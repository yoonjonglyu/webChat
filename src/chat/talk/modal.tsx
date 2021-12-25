import React from 'react';

interface ModalProps {

}

const Modal: React.FC<ModalProps> = () => {
    return (
        <article
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgb(0,0,0, 0.5)",
            }}
        >
            <div data-testid="modal-box">
                <h3 data-testid="modal-title">title</h3>
                <p data-testid="modal-message">메시지</p>
                <button type="button">확인</button>
            </div>
        </article>
    );
};

export default Modal;