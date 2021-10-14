import { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Category } from 'src/store/Categories/Categories.types';
import { Tax } from 'src/store/Products/Products.types';
import { ErrorType } from 'src/types/error.types';
import { SelectedOption } from 'src/types/select.types';
import { formatDataForSelect } from 'src/utils/helpers';

interface SelectAsyncProps {
    selectedValue?: SelectedOption;
    fetchValues: (searchValue: string) => Promise<Tax[] | Category[]>;
    onChangeValue: (selectedOption: SelectedOption) => void;
    setError: (error: ErrorType) => void;
    name?: string;
}

const SelectAsync: React.FC<SelectAsyncProps> = ({
    selectedValue,
    fetchValues,
    onChangeValue,
    setError,
    name,
}) => {
    const [values, setValues] = useState<SelectedOption[] | undefined>();

    const searchValues = async (searchValue: string) => {
        try {
            const values = await fetchValues(searchValue);
            const formatedValues = values.map((value: Tax | Category) =>
                formatDataForSelect(value)
            );

            setValues(formatedValues);
            return formatedValues;
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        }
    };

    const handleValueChange = (selectedOption: SingleValue<SelectedOption>) =>
        onChangeValue(selectedOption as SelectedOption);

    return (
        <AsyncSelect
            name={name}
            defaultOptions
            value={selectedValue || values?.[0]}
            loadOptions={searchValues}
            onChange={handleValueChange}
        />
    );
};

export default SelectAsync;
