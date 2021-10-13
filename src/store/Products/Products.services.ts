import api from 'src/api';
import { Product } from './Products.types';

export const fetchProducts = async () => {
    const { data, status } = await api().get('/products?include=category');
    return data;
};

export const fetchProduct = async (id: number) => {
    const { data, status } = await api().get(`/products/${id}?include=category`);
    return data;
};

export const editProduct = async (product: Product, id: number) => {
    const { status } = await api().put(`/products/${id}`, product);
    return status;
};
