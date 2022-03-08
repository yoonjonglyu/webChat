import React from 'react';

import ConfigureStoreProvider from './configureStore';

const RootContextProvider: React.FC = ({ children }) => {
    return (
        <ConfigureStoreProvider>
            {children}
        </ConfigureStoreProvider>
    );
};

export default RootContextProvider;
