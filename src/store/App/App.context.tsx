import React, { createContext, useReducer } from 'react';
import { AppActions, AppActionType, AppState, ProviderValue } from './App.types';

export const AppContext = createContext({} as ProviderValue);

const initialState: AppState = {
    loading: false,
    error: false,
    errorMessage: '',
};

const reducer = (state: AppState, action: AppActions) => {
    switch (action.type) {
        case AppActionType.LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        default:
            return state;
    }
};

const AppProvider: React.FC = ({ children }) => {
    const [appState, appDispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ appState, appDispatch }}>{children}</AppContext.Provider>;
};

export default AppProvider;
