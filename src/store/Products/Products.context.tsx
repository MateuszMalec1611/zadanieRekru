import React, { createContext, useEffect, useReducer } from 'react';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from '../App/App.types';
import { fetchProducts } from './Products.services';
import {
    Product,
    ProductsActions,
    ProductsActionType,
    ProductsState,
    ProviderValue,
} from './Products.types';

export const ProductsContext = createContext({} as ProviderValue);

const initialState: ProductsState = {
    products: [],
    updateProducts: true,
};

const reducer = (state: ProductsState, action: ProductsActions) => {
    switch (action.type) {
        case ProductsActionType.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case ProductsActionType.UPDATE_PRODUCTS:
            return {
                ...state,
                updateProducts: action.payload,
            };

        default:
            return state;
    }
};

const ProductsProvider: React.FC = ({ children }) => {
    const [productsState, productsDispatch] = useReducer(reducer, initialState);
    const { appDispatch } = useApp();
    const { updateProducts } = productsState;

    const getProducts = async () => {
        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });

            const { data } = await fetchProducts();
            const products: Product[] = data;

            productsDispatch({ type: ProductsActionType.GET_PRODUCTS, payload: products });
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
            productsDispatch({ type: ProductsActionType.UPDATE_PRODUCTS, payload: false });
        }
    };

    useEffect(() => {
        if (updateProducts) getProducts();
    }, [updateProducts]);

    return (
        <ProductsContext.Provider value={{ productsState, productsDispatch }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
