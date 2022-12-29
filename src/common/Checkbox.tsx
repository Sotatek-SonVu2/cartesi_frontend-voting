import { FlexLayout } from 'styled/main'

interface PropsType {
	label: string
	register: any
}

const Checkbox = ({ label, register }: PropsType) => {
	return (
		<FlexLayout>
			<input type='checkbox' {...register} />
			<label>{label}</label>
		</FlexLayout>
	)
}

export default Checkbox
