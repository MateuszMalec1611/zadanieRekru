import React, { createContext, useCallback, useReducer } from 'react';
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
    loading: false,
    error: undefined,
};

const reducer = (state: ProductsState, action: ProductsActions) => {
    switch (action.type) {
        case ProductsActionType.ADD_PRODUCT:
            let newProductList: [] | Product[] = [];
            if (!!state.products.length) newProductList = [...state.products, action.payload];
            return {
                ...state,
                products: newProductList,
                loading: false,
            };
        case ProductsActionType.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case ProductsActionType.UPDATE_PRODUCT:
            const updatedProducts = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return action.payload;
                }
                return product;
            });
            return {
                ...state,
                products: updatedProducts,
                loading: false,
            };
        case ProductsActionType.UPDATE_PRODUCT_CATEGORY:
            const updatedProductsCategory = state.products.map(product => {
                if (product.category.id === action.payload.id) {
                    return {
                        ...product,
                        category: action.payload,
                    };
                }
                return product;
            });
            return {
                ...state,
                products: updatedProductsCategory,
                loading: false,
            };
        case ProductsActionType.SET_LOADING:
            return {
                ...state,
                loading: action.payload ?? true,
            };
        default:
            return state;
    }
};

const ProductsProvider: React.FC = ({ children }) => {
    const [productsState, productsDispatch] = useReducer(reducer, initialState);

    const getProducts = useCallback(async () => {
        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });

            const { data } = await fetchProducts();
            const products: Product[] = data;

            productsDispatch({ type: ProductsActionType.SET_PRODUCTS, payload: products });
        } catch (err) {
            alert(err);
        }
    }, []);

    return (
        <ProductsContext.Provider value={{ productsState, productsDispatch, getProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
