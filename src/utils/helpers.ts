import { SelectedOption } from 'src/types/select.types';

export const formatDataForSelect = (data: any) => {
    return {
        label: data?.name || '',
        value: data?.id,
    } as SelectedOption;
};
