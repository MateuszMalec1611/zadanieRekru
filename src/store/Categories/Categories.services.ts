import api from 'src/api';

export const fetchCategories = async () => {
    const { data, status } = await api().get('/product_categories');
    return data;
};
