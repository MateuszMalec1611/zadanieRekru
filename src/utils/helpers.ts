import { SelectOption } from 'src/pages/EditProduct/EditProduct';

export const formatDataForSelect = (data: any) => {
    return {
        label: data?.name || '',
        value: data?.id,
    } as SelectOption;
};
