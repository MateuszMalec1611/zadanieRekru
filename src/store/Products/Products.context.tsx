import React, { createContext, useReducer } from 'react';
import {
    ProductsActions,
    ProductsActionType,
    ProductsState,
    ProviderValue,
} from './Products.types';

export const ProductsContext = createContext({} as ProviderValue);

const initialState: ProductsState = {
    products: [],
};

const reducer = (state: ProductsState, action: ProductsActions) => {
    switch (action.type) {
        case ProductsActionType.GET_PRODUCTS:
            return {
                products: action.payload,
            };

        default:
            return state;
    }
};

const ProductsProvider: React.FC = ({ children }) => {
    const [productsState, productsDispatch] = useReducer(reducer, initialState);

    return (
        <ProductsContext.Provider value={{ productsState, productsDispatch }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
