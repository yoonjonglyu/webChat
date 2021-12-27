import React from 'react';

import ModalContextProvider from './modalContext';
import RoomContextProvider from './roomContext';

const RootContextProvider: React.FC = ({ children }) => {
    return (
        <RoomContextProvider>
            <ModalContextProvider>
                {children}
            </ModalContextProvider>
        </RoomContextProvider>
    );
};

export default RootContextProvider;
