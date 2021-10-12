export type ProviderValue = {
    categoriesState: CategoriesState;
    categoriesDispatch: (action: CategoriesActions) => void;
};

export interface CategoriesState {
    categories: string[];
}

export type GetCategories = {
    type: CategoriesActionType.GET_CATEGORIES;
    payload: string[];
};

export type Category = {
    id: number;
    name: string;
    status: string;
    uid: string;
    updated_at: string;
};

export type CategoriesActions = GetCategories;

export enum CategoriesActionType {
    GET_CATEGORIES = 'GET_CATEGORIES',
}
