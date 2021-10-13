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

export type AddProduct = {
    type: ProductsActionType.ADD_PRODUCT;
    payload: Product;
};

export type SetProducts = {
    type: ProductsActionType.SET_PRODUCTS;
    payload: Product[];
};

export type UpdateProduct = {
    type: ProductsActionType.UPDATE_PRODUCT;
    payload: Product;
};

export type UpdateProductCategory = {
    type: ProductsActionType.UPDATE_PRODUCT_CATEGORY;
    payload: Category;
};

export type SetLoading = {
    type: ProductsActionType.SET_LOADING;
    payload?: boolean;
};

export type Product = {
    name: string;
    id: number;
    category: Category;
    category_id: number;
    measure_type: string;
    tax_id: number;
    type: string;
    uid: string;
};

export type ProductToAdd = {
    name: string;
    measure_type: string;
    category_id: number;
    tax_id: number;
    type: 'BASIC';
};

export type Tax = {
    id: 4;
    name: '0%';
};

export type ProductsActions =
    | AddProduct
    | SetProducts
    | UpdateProduct
    | UpdateProductCategory
    | SetLoading;

export enum ProductsActionType {
    ADD_PRODUCT = 'ADD_PRODUCT',
    SET_PRODUCTS = 'GET_PRODUCTS',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
    UPDATE_PRODUCT_CATEGORY = 'UPDATE_PRODUCT_CATEGORY',
    SET_LOADING = 'SET_LOADING',
}
