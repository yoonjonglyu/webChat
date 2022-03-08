import React from 'react';

import ModalContextProvider from './modalContext';
import ConfigContextProvider from './configContext';
import ConfigureStoreProvider from './configureStore';

const RootContextProvider: React.FC = ({ children }) => {
    return (
        <ConfigContextProvider>
            <ConfigureStoreProvider>
            <ModalContextProvider>
                {children}
            </ModalContextProvider>
            </ConfigureStoreProvider>
        </ConfigContextProvider>
    );
};

export default RootContextProvider;
