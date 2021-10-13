import { useContext } from 'react';
import { CategoriesContext } from 'src/store/Categories/Categories.context';

export const useCategory = () => useContext(CategoriesContext);
