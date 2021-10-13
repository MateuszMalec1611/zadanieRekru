import { Category } from '../Categories/Categories.types';

export type ProviderValue = {
    productsState: ProductsState;
    productsDispatch: (action: ProductsActions) => void;
    getProducts: () => Promise<void>;
};

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error?: Error;
}

export type SetProducts = {
    type: ProductsActionType.SET_PRODUCTS;
    payload: Product[];
};

export type UpdateProduct = {
    type: ProductsActionType.UPDATE_PRODUCT;
    payload: Product;
};

export type SetLoading = {
    type: ProductsActionType.SET_LOADING;
    payload?: boolean;
};

export type Product = {
    uid: string;
    category: Category;
    category_id: number;
    id: number;
    measure_type: string;
    name: string;
    tax_id: number;
    type: string;
};

export type ProductsActions = SetProducts | UpdateProduct | SetLoading;

export enum ProductsActionType {
    ADD_PRODUCT = 'ADD_PRODUCT',
    SET_PRODUCTS = 'GET_PRODUCTS',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
    SET_LOADING = 'SET_LOADING',
}
