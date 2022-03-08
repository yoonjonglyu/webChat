import React from 'react';

import ConfigContextProvider from './configContext';
import ConfigureStoreProvider from './configureStore';

const RootContextProvider: React.FC = ({ children }) => {
    return (
        <ConfigContextProvider>
            <ConfigureStoreProvider>
                {children}
            </ConfigureStoreProvider>
        </ConfigContextProvider>
    );
};

export default RootContextProvider;
