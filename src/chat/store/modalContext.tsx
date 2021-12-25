import React, { createContext, useState } from 'react';

export const ModalContext = createContext({
    isModal: false,
    modalContents: '',
    handleIsModal: (data: boolean) => { },
    handleModal: (data: React.ReactNode) => { }
});

const ModalContextProvider: React.FC = ({ children }) => {
    const [isModal, setisModal] = useState(false);
    const [modalContents, setModalContents] = useState<any>();
    const handleIsModal = (data: boolean) => setisModal(data);
    const handleModal = (data: React.ReactNode) => setModalContents(data);

    return (
        <ModalContext.Provider
            value={{ 
                isModal,
                modalContents,
                handleModal,
                handleIsModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
