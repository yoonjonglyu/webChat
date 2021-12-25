import React from 'react';

interface ModalProps {

}

const Modal: React.FC<ModalProps> = () => {
    return (
        <article
            style={{
                position: "absolute",
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                background: "rgb(0,0,0, 0.5)",
            }}
        >
            <div data-testid="modal-box"
                style={{
                    display: "flex",
                    flexFlow: "column",
                    minWidth: "50%",
                    minHeight: "30%",
                    margin: "0 auto",
                    background: "#bb5f5f",
                    borderRadius: "3px",
                }}
            >
            </div>
        </article>
    );
};

export default Modal;