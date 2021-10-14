import AsyncSelect from 'react-select/async';
import { SelectedOption } from 'src/types/select.types';
import { formatDataForSelect } from 'src/utils/helpers';

interface SelectAsyncProps {
    selectedValue?: SelectedOption;
    fetchValues: (searchValue: string) => Promise<unknown[]>;
    onChangeValue: (selectedOption: SelectedOption) => void;
}

const SelectAsync: React.FC<SelectAsyncProps> = ({ selectedValue, fetchValues, onChangeValue }) => {
    const searchValues = async (searchValue: string) => {
        const values = await fetchValues(searchValue);

        return values.map((value: unknown) => formatDataForSelect(value));
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
