import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Product, ProductToAdd, Tax } from './Products.types';

export const fetchProducts = async () => {
    const { data }: AxiosResponse<{ data: Product[]; error: any[] }> = await api().get(
        '/productdss?include=category'
    );
    return data;
};

export const fetchProduct = async (id: number) => {
    const { data }: AxiosResponse<{ data: Product; error: any[] }> = await api().get(
        `/products/${id}?include=category`
    );
    return data;
};

export const addProduct = async (product: ProductToAdd) => {
    const { data }: AxiosResponse<{ data: Product; error: any[] }> = await api().post(
        `/products`,
        product
    );
    return data.data;
};

export const editProduct = async (product: Product) => {
    const { data }: AxiosResponse<{ data: Product; error: any[] }> = await api().put(
        `/products/${product.id}`,
        product
    );
    return data.data;
};

export const fetchTaxes = async (taxName: string) => {
    const { data }: AxiosResponse<{ data: Tax[]; error: any[] }> = await api().get(
        `/taxes?search=${taxName}`
    );
    return data.data;
};
