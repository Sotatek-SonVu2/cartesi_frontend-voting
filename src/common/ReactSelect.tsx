import Select from 'react-select';
import { colorTheme } from 'styled/common';

const colourStyles = {
    control: (styles: any) => ({ ...styles, width: '200px', backgroundColor: 'transparent' }),
    option: (provided: any, state: any) => ({ ...provided, padding: '5px 10px', backgroundColor: state.isSelected ? colorTheme.primary : '#fff' }),
    singleValue: (styles: any) => ({ ...styles, color: '#fff' }),
};

const ReactSelect = (props: any) => {
    const { options, onChange, ...rest } = props

    return (
        <Select
            classNamePrefix="select"
            name="color"
            styles={colourStyles}
            defaultValue={options[0]}
            options={options}
            onChange={onChange}
            {...rest}
        />
    )
}

export default ReactSelect