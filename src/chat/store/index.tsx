import React from 'react';

import ModalContextProvider from './modalContext';
import ConfigContextProvider from './configContext';

const RootContextProvider: React.FC = ({ children }) => {
    return (
        <ConfigContextProvider>
            <ModalContextProvider>
                {children}
            </ModalContextProvider>
        </ConfigContextProvider>
    );
};

export default RootContextProvider;
