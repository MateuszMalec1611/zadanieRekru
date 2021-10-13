import api from 'src/api';
import { Category } from './Categories.types';

export const fetchCategories = async () => {
    const { data, status } = await api().get('/product_categories');
    return data;
};

export const fetchCategory = async (id: number) => {
    const { data, status } = await api().get(`/product_categories/${id}`);
    return data;
};

export const fetchCategorySelect = async (categoryName: string) => {
    const { data, status } = await api().get(`/product_categories?search=${categoryName}`);
    return data;
};

export const editCategory = async (category: Category, id: number) => {
    const { status } = await api().put(`/product_categories/${id}`, category);
    return status;
};
