import React, { useContext } from 'react';

import { StoreContext } from './store/configureStore';

interface ModalProps {

}

const Modal: React.FC<ModalProps> = () => {
    const { handleIsModal, modalContents } = useContext(StoreContext);
    const closeModal = () => {
        handleIsModal(false);
    }

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
                zIndex: 99999999,
            }}
            onClick={closeModal}
        >
            <div data-testid="modal-box"
                style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    justifyContent: "center",
                    minWidth: "50%",
                    minHeight: "30%",
                    margin: "0 auto",
                    background: "#bb5f5f",
                    borderRadius: "3px",
                }}
            >
                {modalContents}
            </div>
        </article>
    );
};

export default Modal;