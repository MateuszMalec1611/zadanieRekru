import { ErrorType } from "src/types/error.types";

export type ProviderValue = {
    categoriesState: CategoriesState;
    categoriesDispatch: (action: CategoriesActions) => void;
    getCategories: () => Promise<void>;
};

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: ErrorType;
}

export type AddCategory = {
    type: CategoriesActionType.ADD_CATEGORY;
    payload: Category;
};

export type GetCategories = {
    type: CategoriesActionType.GET_CATEGORIES;
    payload: Category[];
};

export type UpdateCategory = {
    type: CategoriesActionType.UPDATE_CATEGORY;
    payload: Category;
};

export type SetLoading = {
    type: CategoriesActionType.SET_LOADING;
    payload?: boolean;
};

export type SetError = {
    type: CategoriesActionType.SET_ERROR;
    payload: {
        isError?: boolean;
        errorMessage?: string;
    };
};

export type Category = {
    id: number;
    name: string;
    status: string;
    uid: string;
    updated_at: string;
};

export type CategoriesActions =
    | AddCategory
    | GetCategories
    | UpdateCategory
    | SetLoading
    | SetError;

export enum CategoriesActionType {
    ADD_CATEGORY = 'ADD_CATEGORY',
    GET_CATEGORIES = 'GET_CATEGORIES',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
}
