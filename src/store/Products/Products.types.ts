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

export type ProductsActions = GetProducts;

export enum ProductsActionType {
    GET_PRODUCTS = 'GET_PRODUCTS',
}
