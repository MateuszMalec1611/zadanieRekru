import AsyncSelect from 'react-select/async';
import { ErrorType } from 'src/types/error.types';
import { SelectedOption } from 'src/types/select.types';
import { formatDataForSelect } from 'src/utils/helpers';

interface SelectAsyncProps {
    selectedValue?: SelectedOption;
    fetchValues: (searchValue: string) => Promise<unknown[]>;
    onChangeValue: (selectedOption: SelectedOption) => void;
    setError: (error: ErrorType) => void;
}

const SelectAsync: React.FC<SelectAsyncProps> = ({
    selectedValue,
    fetchValues,
    onChangeValue,
    setError,
}) => {
    const searchValues = async (searchValue: string) => {
        try {
            const values = await fetchValues(searchValue);

            return values.map((value: unknown) => formatDataForSelect(value));
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        }
    };

    const handleValueChange = (selectedOption?: SelectedOption | null) =>
        onChangeValue(selectedOption!);

    return (
        <AsyncSelect
            defaultOptions
            value={selectedValue}
            loadOptions={searchValues}
            onChange={handleValueChange}
        />
    );
};

export default SelectAsync;
