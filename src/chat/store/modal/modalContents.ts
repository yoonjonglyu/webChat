import { useState } from 'react';

export const initState = {
    modalContents: '',
    handleModalContents: (contents: React.ReactNode) => { }
};

export function setContext() {
    const [modalContents, setModalContents] = useState<React.ReactNode>();
    const handleModalContents = (contents: React.ReactNode) => setModalContents(contents);

    return {
        modalContents,
        handleModalContents
    };
}