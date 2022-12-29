import Label from 'common/Label'
import TrashIcon from 'images/trash.svg'
import styled from 'styled-components'
import { PrimaryButton } from 'styled/common'
import { ErrorText, Input, OptionLabel, Wrapper } from 'styled/form'

interface PropsType {
	fields: any
	register: any
	errors: any
	onAdd: () => void
	onRemove: (index: number) => void
}

const AddButton = styled(PrimaryButton)`
	margin-top: 10px;
`

const Options = styled(OptionLabel)`
	padding: 0;

	& img {
		margin-left: 10px;
	}
`

const ManagerOptions = ({ fields, register, errors, onAdd, onRemove }: PropsType) => {
	return (
		<>
			<Wrapper>
				<Label>Managers:</Label>
				{fields.map((_: any, index: number) => (
					<div key={index}>
						<Options>
							<Input
								type='text'
								{...register(`managers.${index}.name`)}
								placeholder={`Manager ${index + 1}'s address wallet.`}
							/>
							{fields.length > 1 && (
								<img src={TrashIcon} alt='trash icon' width={25} onClick={() => onRemove(index)} />
							)}
						</Options>
						<ErrorText>{errors?.managers?.[index]?.name?.message}</ErrorText>
					</div>
				))}
			</Wrapper>
			<AddButton type='button' onClick={onAdd}>
				Add Manager
			</AddButton>
		</>
	)
}

export default ManagerOptions
