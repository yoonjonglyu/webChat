import { useState } from 'react';

export const initState = {
    modalContents: '',
    handleModalContents: (data: React.ReactNode) => { }
};

export function setContext() {
    const [modalContents, setModalContents] = useState<any>();
    const handleModalContents = (data: React.ReactNode) => setModalContents(data);

    return {
        modalContents,
        handleModalContents
    };
}