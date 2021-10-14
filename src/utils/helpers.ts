import { Category } from 'src/store/Categories/Categories.types';
import { Tax } from 'src/store/Products/Products.types';
import { SelectOption } from 'src/types/select.types';

export const formatDataForSelect = (data: Tax | Category) => {
    return {
        label: data?.name || '',
        value: data?.id,
    } as SelectOption;
};

export const translateErrorMessages = (code?: string) => {
    switch (code) {
        case 'name_may_not_be_empty':
            return 'Nazwa nie może być pusta';
        case 'name_constraints.nameisunique':
            return 'Podana nazwa już istnieje';
        case 'name_product_with_name_exists':
            return 'Podana nazwa już istnieje';
        default:
            break;
    }
};
