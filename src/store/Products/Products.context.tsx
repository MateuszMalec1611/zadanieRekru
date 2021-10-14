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
    error: {
        isError: false,
        errorMessage: '',
    },
    areDownloaded: false,
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
                error: { isError: false, errorMessage: '' },
                areDownloaded: true,
            };
        case ProductsActionType.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: { isError: false, errorMessage: '' },
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
                error: { isError: false, errorMessage: '' },
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
                error: { isError: false, errorMessage: '' },
            };
        case ProductsActionType.SET_LOADING:
            return {
                ...state,
                loading: action.payload ?? true,
                error: { isError: false, errorMessage: '' },
            };
        case ProductsActionType.SET_ERROR:
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

const ProductsProvider: React.FC = ({ children }) => {
    const [productsState, productsDispatch] = useReducer(reducer, initialState);

    const getProducts = useCallback(async () => {
        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });

            const { data } = await fetchProducts();
            const products: Product[] = data;

            productsDispatch({ type: ProductsActionType.SET_PRODUCTS, payload: products });
        } catch (err: any) {
            productsDispatch({
                type: ProductsActionType.SET_ERROR,
                payload: { errorMessage: err.message },
            });
        }
    }, []);

    return (
        <ProductsContext.Provider value={{ productsState, productsDispatch, getProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
