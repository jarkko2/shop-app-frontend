import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const GlobalContext = createContext();

// Create a provider component
export function GlobalProvider({ children }) {
    const [globalState, setGlobalState] = useState(false);

    useEffect(() => {
        if (globalState)
        {
            setGlobalState(false)
        }
      }, [globalState]);
    // You can define functions here to update the global state

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalContext.Provider>
    );
}

// Custom hook to access the global state and update functions
export function useGlobal() {
    return useContext(GlobalContext);
}
