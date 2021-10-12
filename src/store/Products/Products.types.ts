export type ProviderValue = {
    productsState: ProductsState;
    productsDispatch: (action: ProductsActions) => void;
};

export interface ProductsState {
    products: string[];
}

export type GetProducts = {
    type: ProductsActionType.GET_PRODUCTS;
    payload: string[];
};

export type Product = {
    name: string;
    category_name: string;
    category_id: number;
    id: number;
    uid: string;
    updated_at: string;
    status: string;
};

export type ProductsActions = GetProducts;

export enum ProductsActionType {
    GET_PRODUCTS = 'GET_PRODUCTS',
}
