import React, { createContext, useReducer } from 'react';
import {
    CategoriesActions,
    CategoriesActionType,
    CategoriesState,
    ProviderValue,
} from './Categories.types';

export const CategoriesContext = createContext({} as ProviderValue);

const initialState: CategoriesState = {
    categories: [],
};

const reducer = (state: CategoriesState, action: CategoriesActions) => {
    switch (action.type) {
        case CategoriesActionType.GET_CATEGORIES:
            return {
                ...state,
                products: action.payload,
            };

        default:
            return state;
    }
};

const CategoriesProvider: React.FC = ({ children }) => {
    const [categoriesState, categoriesDispatch] = useReducer(reducer, initialState);

    return (
        <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
