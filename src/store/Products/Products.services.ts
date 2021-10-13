import api from 'src/api';

export const fetchProducts = async () => {
    const { data, status } = await api().get('/products');
    return data;
};

export const fetchProduct = async (id: number) => {
    const { data, status } = await api().get(`/products/${id}`);
    return data;
};
