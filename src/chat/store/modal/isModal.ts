import { useState } from 'react';

export const initState = {
    isModal: false,
    handleIsModal: (flag: boolean) => { },
};

export function setContext(){
    const [isModal, setisModal] = useState(false);
    const handleIsModal = (flag: boolean) => setisModal(flag);

    return {
        isModal,
        handleIsModal    
    };
}