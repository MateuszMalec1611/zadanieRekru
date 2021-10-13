import React, { createContext, useEffect, useReducer } from 'react';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from '../App/App.types';
import { fetchCategories } from './Categories.services';
import {
    CategoriesActions,
    CategoriesActionType,
    CategoriesState,
    Category,
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
                categories: action.payload,
            };

        default:
            return state;
    }
};

const CategoriesProvider: React.FC = ({ children }) => {
    const [categoriesState, categoriesDispatch] = useReducer(reducer, initialState);
    const { appDispatch } = useApp();

    const getCategories = async () => {
        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });

            const { data } = await fetchCategories();
            const categories: Category[] = data;

            categoriesDispatch({ type: CategoriesActionType.GET_CATEGORIES, payload: categories });
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
