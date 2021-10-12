import React, { createContext, useEffect, useReducer } from 'react';
import { fetchCategories } from '../Categories/Categories.services';
import { fetchProducts } from '../Products/Products.services';
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
                products: action.payload,
            };

        default:
            return state;
    }
};

const AppProvider: React.FC = ({ children }) => {
    const [appState, appDispatch] = useReducer(reducer, initialState);

    const getProductsAndCategories = async () => {
        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });
            

            const { data: products } = await fetchProducts();
            const { data: categories } = await fetchCategories();


            console.log(products);
            console.log(categories);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    useEffect(() => {
        getProductsAndCategories();
    }, []);

    return <AppContext.Provider value={{ appState, appDispatch }}>{children}</AppContext.Provider>;
};

export default AppProvider;
