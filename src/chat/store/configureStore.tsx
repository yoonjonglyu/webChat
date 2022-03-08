import React, { createContext } from 'react';
import RootState from './rootState';

export const StoreContext: any = createContext({
    ...RootState.reduce((result, context) => ({
        ...result,
        ...context.initState,
    }), {})
});

const ConfigureStore: React.FC = ({ children }) => {
    const state = RootState.reduce((result, context) => ({
        ...result,
        ...context.setContext(),
    }), {});
    
    return (
        <StoreContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default ConfigureStore;
