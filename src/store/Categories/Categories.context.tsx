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
    error: {
        isError: false,
        errorMessage: '',
    },
    areDownloaded: false,
};

const reducer = (state: CategoriesState, action: CategoriesActions) => {
    switch (action.type) {
        case CategoriesActionType.ADD_CATEGORY:
            let newCategoryList: [] | Category[] = [];
            if (state.areDownloaded) newCategoryList = [...state.categories, action.payload];
            return {
                ...state,
                categories: newCategoryList,
                loading: false,
            };
        case CategoriesActionType.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                areDownloaded: true,
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
        case CategoriesActionType.SET_ERROR:
            return {
                ...state,
                error: {
                    isError: action.payload.isError ?? true,
                    errorMessage: action.payload.errorMessage ?? '',
                },
                loading: false,
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

            const categories = await fetchCategories();

            categoriesDispatch({ type: CategoriesActionType.SET_CATEGORIES, payload: categories });
        } catch (err: any) {
            categoriesDispatch({
                type: CategoriesActionType.SET_ERROR,
                payload: { errorMessage: err.message },
            });
        }
    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch, getCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
