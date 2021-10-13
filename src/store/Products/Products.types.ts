export type ProviderValue = {
    productsState: ProductsState;
    productsDispatch: (action: ProductsActions) => void;
};

export interface ProductsState {
    products: Product[];
    updateProducts: boolean;
}

export type GetProducts = {
    type: ProductsActionType.GET_PRODUCTS;
    payload: Product[];
};

export type GetProduct = {
    type: ProductsActionType.GET_PRODUCTS;
    payload: Product;
};
export type UpdateProducts = {
    type: ProductsActionType.UPDATE_PRODUCTS;
    payload: boolean;
};

export type Product = {
    category: {
        id: number;
        name: string;
        status: string;
        uid: string;
        updated_at: string;
    };
    category_id: number;
    cost_price_gross_money: {
        amount: number;
        currency: string;
    };
    cost_price_money: {
        amount: number;
        currency: string;
    };
    id: number;
    measure_type: string;
    name: string;
    recipe_amount: number;
    state: {
        available_amount: number;
        commited_amount: number;
        in_stock_amount: number;
        incoming_amount: number;
    };
    status: string;
    tax_id: number;
    type: string;
    uid: string;
    updated_at: string;
    weight: number;
};

export type ProductsActions = GetProducts | UpdateProducts;

export enum ProductsActionType {
    GET_PRODUCTS = 'GET_PRODUCTS',
    GET_PRODUCT = 'GET_PRODUCT',
    UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
}
