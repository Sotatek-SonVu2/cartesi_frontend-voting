import { yupResolver } from '@hookform/resolvers/yup'
import MDEditor from '@uiw/react-md-editor'
import Label from 'common/Label'
import Loading from 'common/Loading'
import Title from 'common/Title'
import ProfileHandle from 'handles/profile.handle'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Content, DefaultButton, FlexLayoutBtn, SuccessButton } from 'styled/common'
import { ErrorText, Form, FormItem, Input, InputGroup } from 'styled/form'
import { Loader } from 'styled/loading'
import { Container, ContentWrapper } from 'styled/main'
import { SubmitButton } from 'styled/profile'
import { ManagerType, ProfileHandleRes } from 'utils/interface'
import * as yup from 'yup'
import ManagerOptions from '../Item/ManagerOptions'

const ManagerDefault: ManagerType[] = [
	{
		name: '',
	},
]

const schema = yup
	.object({
		name: yup.string().required('Name is a required field!').max(200),
		description: yup.string().required('Desciption is a required field!'),
	})
	.required()

const ProfileForm = () => {
	const { profileId } = useParams()

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	}: any = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			website: '',
			description: '',
			thumbnail: '',
			managers: profileId ? [] : ManagerDefault,
			twitter: '',
			facebook: '',
		},
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'managers',
	})
	const { getProfileDetail, onSubmit }: ProfileHandleRes = ProfileHandle(setValue)

	useEffect(() => {
		getProfileDetail()
	}, [])

	return (
		<Container>
			<ContentWrapper>
				<Content>
					<Title
						text={!profileId ? 'Create new profile' : 'Edit profile'}
						userGuideType={!profileId ? 'create' : 'edit'}
					/>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormItem>
							<Label required>Name:</Label>
							<Input type='text' {...register('name')} placeholder="Profile's name.." />
							<ErrorText>{errors?.name?.message}</ErrorText>
						</FormItem>
						<FormItem>
							<Label>Website:</Label>
							<Input type='text' {...register('website')} placeholder='Website..' />
						</FormItem>
						<FormItem>
							<Label>Thumbnail:</Label>
							<Input type='text' {...register('thumbnail')} placeholder='Thumbnail..' />
						</FormItem>
						<FormItem>
							<Label>Social media:</Label>
							<InputGroup>
								<Input type='text' {...register('twitter')} placeholder="Twitter's link.." />
								<Input type='text' {...register('facebook')} placeholder="Facebook's link.." />
							</InputGroup>
						</FormItem>
						<FormItem>
							<Label required>Description:</Label>
							<Controller
								control={control}
								{...register('description')}
								render={({ field: { value, onChange } }) => (
									<div style={{ margin: '10px 0px 20px' }}>
										<MDEditor
											value={value}
											onChange={onChange}
											textareaProps={{
												placeholder: 'Description... (Markdown writing is supported)',
											}}
										/>
									</div>
								)}
							/>
							<ErrorText>{errors?.description?.message}</ErrorText>
						</FormItem>
						<FormItem>
							<ManagerOptions
								fields={fields}
								errors={errors}
								register={register}
								onAdd={() => append(ManagerDefault)}
								onRemove={(index: number) => remove(index)}
							/>
						</FormItem>
						<FlexLayoutBtn>
							<DefaultButton type='button' onClick={() => navigate(-1)}>
								Back
							</DefaultButton>
							<SubmitButton type='submit'>{!profileId ? 'Create' : 'Save'}</SubmitButton>
						</FlexLayoutBtn>
					</Form>
				</Content>
			</ContentWrapper>
		</Container>
	)
}

export default ProfileForm
