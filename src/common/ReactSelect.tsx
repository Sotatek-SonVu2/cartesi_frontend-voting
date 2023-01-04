import Select from 'react-select'
import { colorTheme } from 'styled/common'

export interface OptionsType {
	label: string
	value: any
}

interface PropsType {
	options: OptionsType[]
	defaultValue?: any
	onChange?: any
	width?: string
	controlBackground?: string
	optionBackground?: string
	valueColor?: string
	controlColor?: string
	optionColor?: string
	placeholder?: string
	styleWrapper?: any
	value?: OptionsType
	props?: any
}

const ReactSelect = ({
	options,
	onChange,
	width = '200px',
	valueColor = '#fff',
	controlColor = '#fff',
	optionColor = '#000',
	controlBackground = 'transparent',
	optionBackground = '#fff',
	styleWrapper,
	placeholder,
	defaultValue,
	value,
	props,
}: PropsType) => {
	const colourStyles = {
		control: (styles: any) => ({
			...styles,
			width: width,
			backgroundColor: controlBackground,
			color: controlColor,
		}),
		option: (provided: any, state: any) => ({
			...provided,
			padding: '5px 10px',
			backgroundColor: state.isSelected ? colorTheme.primary : optionBackground,
			color: optionColor,

			'&:hover': {
				background: '#a5d6ff',
				fontWeight: '500',
			},
		}),
		singleValue: (styles: any) => ({ ...styles, color: valueColor }),
	}

	return (
		<div style={{ ...styleWrapper }}>
			<Select
				classNamePrefix='select'
				styles={colourStyles}
				defaultValue={defaultValue}
				placeholder={placeholder}
				options={options}
				onChange={onChange}
				className='basic-single'
				value={value}
				menuPlacement='auto'
				menuPosition='fixed'
				{...props}
			/>
		</div>
	)
}

export default ReactSelect
