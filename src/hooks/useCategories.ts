import { useContext } from 'react';
import { CategoriesContext } from 'src/store/Categories/Categories.context';

export const useCategories = () => useContext(CategoriesContext);
