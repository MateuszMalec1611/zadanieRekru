import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Category } from './Categories.types';

export const fetchCategories = async () => {
    const { data } = await api().get('/product_categories');
    return data;
};

export const fetchCategory = async (id: number) => {
    const { data } = await api().get(`/product_categories/${id}`);
    return data;
};

export const fetchCategorySelect = async (categoryName: string) => {
    const { data } = await api().get(`/product_categories?search=${categoryName}`);
    return data;
};

export const editCategory = async (category: Category) => {
    const { data }: AxiosResponse<{ data: Category; error: any[] }> = await api().put(
        `/product_categories/${category.id}`,
        category
    );
    return data.data;
};
