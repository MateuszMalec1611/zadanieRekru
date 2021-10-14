import React, { createContext, useCallback, useReducer } from 'react';
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
    loading: false,
    error: undefined,
};

const reducer = (state: CategoriesState, action: CategoriesActions) => {
    switch (action.type) {
        case CategoriesActionType.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case CategoriesActionType.UPDATE_CATEGORY:
            const updatedCategoies = state.categories.map(category => {
                if (category.id === action.payload.id) {
                    return action.payload;
                }
                return category;
            });
            return {
                ...state,
                categories: updatedCategoies,
                loading: false,
            };
        case CategoriesActionType.SET_LOADING:
            return {
                ...state,
                loading: action.payload ?? true,
            };
        default:
            return state;
    }
};

const CategoriesProvider: React.FC = ({ children }) => {
    const [categoriesState, categoriesDispatch] = useReducer(reducer, initialState);

    const getCategories = useCallback(async () => {
        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });

            const { data } = await fetchCategories();
            const categories: Category[] = data;

            categoriesDispatch({ type: CategoriesActionType.GET_CATEGORIES, payload: categories });
        } catch (err) {
            alert(err);
        }
    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch, getCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
