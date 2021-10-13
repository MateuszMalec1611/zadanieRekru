import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Product } from './Products.types';

export const fetchProducts = async () => {
    const { data } = await api().get('/products?include=category');
    return data;
};

export const fetchProduct = async (id: number) => {
    const { data } = await api().get(`/products/${id}?include=category`);
    return data;
};

export const editProduct = async (product: Product) => {
    const { data }: AxiosResponse<{ data: Product; error: any[] }> = await api().put(
        `/products/${product.id}`,
        product
    );
    return data.data;
};

export const addProduct = async (product: Product) => {
    const { status } = await api().post(`/products`, product);
    return status;
};
