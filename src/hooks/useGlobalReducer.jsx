// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer from "../store"  // Import only the reducer.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and wraps it in a context provider to 
// broadcast the information throughout all the app pages and components.
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, {});
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}