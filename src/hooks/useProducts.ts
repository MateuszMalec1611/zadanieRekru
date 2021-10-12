import { useContext } from 'react';
import { ProductsContext } from 'src/store/Products/Products.context';

export const useProducts = () => useContext(ProductsContext);
