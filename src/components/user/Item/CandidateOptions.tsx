import MDEditor from '@uiw/react-md-editor'
import Label from 'common/Label'
import TrashIcon from 'images/trash.svg'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { PrimaryButton } from 'styled/common'
import { ErrorText, Input, OptionLabel, Wrapper } from 'styled/form'

interface PropsType {
	fields: any
	register: any
	errors: any
	control: any
	onAdd: () => void
	onRemove: (index: number) => void
}

const AddButton = styled(PrimaryButton)`
	margin-top: 10px;
`

const CandidateOptions = ({ fields, register, errors, onAdd, onRemove, control }: PropsType) => {
	return (
		<>
			<Wrapper>
				<Label required>Candidate options:</Label>
				{fields.map((_: any, index: number) => (
					<div key={index}>
						<OptionLabel>
							<Label required>{`Option ${index + 1}:`}</Label>
							{fields.length > 1 && (
								<img src={TrashIcon} alt='trash icon' width={25} onClick={() => onRemove(index)} />
							)}
						</OptionLabel>
						<Input
							type='text'
							{...register(`options.${index}.name`)}
							placeholder="Option's name.."
						/>
						<ErrorText>{errors?.options?.[index]?.name?.message}</ErrorText>
						<Controller
							control={control}
							{...register(`options.${index}.brief_introduction`)}
							render={({ field: { value, onChange } }) => (
								<div style={{ margin: '10px 0px' }}>
									<MDEditor
										value={value}
										onChange={onChange}
										textareaProps={{
											placeholder: 'Brief Introduction... (Markdown writing is supported)',
										}}
									/>
								</div>
							)}
						/>
						<ErrorText>{errors?.options?.[index]?.brief_introduction?.message}</ErrorText>
					</div>
				))}
			</Wrapper>
			<AddButton type='button' onClick={onAdd}>
				Add Option
			</AddButton>
		</>
	)
}

export default CandidateOptions
