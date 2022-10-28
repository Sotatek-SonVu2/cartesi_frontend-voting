import Select from 'react-select';
import { colorTheme } from 'styled/common';

interface PropsType {
    options: any
    onChange: any
}

const colourStyles = {
    control: (styles: any) => ({ ...styles, width: '200px', backgroundColor: 'transparent' }),
    option: (provided: any, state: any) => ({ ...provided, padding: '5px 10px', backgroundColor: state.isSelected ? colorTheme.primary : '#fff' }),
    singleValue: (styles: any) => ({ ...styles, color: '#fff' }),
};

const ReactSelect = ({ options, onChange }: PropsType) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            name="color"
            styles={colourStyles}
            defaultValue={options[0]}
            options={options}
            onChange={onChange}
        />
    )
}

export default ReactSelect