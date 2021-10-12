import { Category } from 'src/store/Categories/Categories.types';
import { Product } from 'src/store/Products/Products.types';

export const prepareProductsData = (products: any, categories: Category[]) => {
    const productsList: Product[] = [];

    products.forEach((product: any) => {
        let categoryName: string | undefined;

        categories.forEach(category => {
            if (category.id === product.id) categoryName = category.name;
        });

        productsList.push({
            name: product.name,
            category_name: !categoryName ? 'nieznana' : categoryName!,
            category_id: product.category_id,
            id: product.id,
            uid: product.uid,
            updated_at: product.updated_at,
            status: product.status,
        });
    });

    return productsList;
};