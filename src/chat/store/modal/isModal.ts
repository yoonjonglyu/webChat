import { useState } from 'react';

export const initState = {
    isModal: false,
    handleIsModal: (data: boolean) => { },
};

export function setContext(){
    const [isModal, setisModal] = useState(false);
    const handleIsModal = (data: boolean) => setisModal(data);

    return {
        isModal,
        handleIsModal    
    };
}