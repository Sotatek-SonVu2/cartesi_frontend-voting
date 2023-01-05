import { yupResolver } from '@hookform/resolvers/yup'
import MDEditor from '@uiw/react-md-editor'
import Label from 'common/Label'
import Loading from 'common/Loading'
import Title from 'common/Title'
import TokensList from 'common/TokensList'
import CampaignHandle from 'handles/campaign.handle'
import { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Content, DefaultButton, FlexLayoutBtn, SuccessButton } from 'styled/common'
import { ErrorText, Form, FormItem, Input } from 'styled/form'
import { Container, ContentWrapper } from 'styled/main'
import { CampaignHandleRes, OptionType } from 'utils/interface'
import * as yup from 'yup'
import CandidateOptions from '../Item/CandidateOptions'

const FORMAT_DATE_PICKER = 'MM/dd/yyyy h:mm aa'

const SubmitButton = styled(SuccessButton)`
	display: flex;
	align-items: center;
`

const EmptyToken = styled(ErrorText)`
	background: #d93025;
	color: #fff;
	padding: 10px;
	margin: 10px 0 20px;
`

const OptionDefault: OptionType[] = [
	{
		name: '',
		brief_introduction: '',
		avatar: '',
	},
]

const optionSchema = {
	name: yup.string().required('Name is a required field!').max(200),
	brief_introduction: yup.string().required('Brief introduction is a required field!'),
}

const schema = yup
	.object({
		name: yup.string().required('Name is a required field!').max(200),
		description: yup.string().required('Desciption is a required field!'),
		fee: yup
			.number()
			.min(0)
			.typeError('Fee must be a number!')
			.required('Fee is a required field!'),
		options: yup.array().of(yup.object().shape(optionSchema)),
	})
	.required()

const CampaignForm = () => {
	const navigate = useNavigate()
	const { campaignId } = useParams()

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
			description: '',
			fee: 0,
			options: campaignId ? [] : OptionDefault,
		},
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
	})

	const {
		handleChangeDate,
		getProfileByUser,
		onSubmit,
		getDataForm,
		setTokenToCreate,
		tokenToCreate,
		token_to_create,
		setTokenToVote,
		tokenToVote,
		token_to_vote,
		dateTime,
		isLoading,
	}: CampaignHandleRes = CampaignHandle(setValue)

	const { startDate, endDate, formErrors } = dateTime

	useEffect(() => {
		if (campaignId) {
			getDataForm()
		}
	}, [campaignId, token_to_vote.isLoading, token_to_create.isLoading])

	const NoToken = () => {
		return <EmptyToken>You don't have any tokens in the system!</EmptyToken>
	}

	return (
		<Container>
			<ContentWrapper>
				<Content>
					{isLoading && <Loading isScreenLoading={isLoading} />}
					<Title
						text={!campaignId ? 'Create new campaign' : 'Edit campaign'}
						userGuideType={!campaignId ? 'create' : 'edit'}
					/>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormItem>
							<Label required>Name:</Label>
							<Input type='text' {...register('name')} placeholder="Campaign's name.." />
							<ErrorText>{errors?.name?.message}</ErrorText>
						</FormItem>
						<FormItem>
							<Label required>Start time:</Label>
							<DatePicker
								name='startDate'
								selected={startDate}
								onChange={handleChangeDate('startDate')}
								customInput={<Input />}
								showTimeSelect
								dateFormat={FORMAT_DATE_PICKER}
							/>
							<ErrorText>{formErrors.startDate}</ErrorText>
						</FormItem>
						<FormItem>
							<Label required>End time:</Label>
							<DatePicker
								name='endDate'
								selected={endDate}
								onChange={handleChangeDate('endDate')}
								customInput={<Input />}
								minDate={startDate}
								showTimeSelect
								dateFormat={FORMAT_DATE_PICKER}
							/>
							<ErrorText>{formErrors.endDate}</ErrorText>
						</FormItem>
						<FormItem>
							<Label required>Description:</Label>
							<Controller
								control={control}
								{...register('description')}
								render={({ field: { value, onChange } }) => (
									<div style={{ margin: '10px 0px' }}>
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
						{!campaignId && (
							<FormItem>
								<Title
									text='Payments:'
									userGuideType='can_create_campaign'
									id='can_create_campaign'
									type='dark'
									titleStyle={{
										color: '#fff',
										fontSize: '16px',
										lineHeight: 'unset',
									}}
								/>
								{token_to_create.tokenList?.length > 0 ? (
									<TokensList
										onChooseCoin={(value: string) => setTokenToCreate(value)}
										tokenType={tokenToCreate || token_to_create?.tokenList[0]?.name}
										isLoading={token_to_create.isLoading}
										tokenList={token_to_create.tokenList}
										style={{
											justifyContent: 'left',
											marginTop: '10px',
										}}
									/>
								) : (
									NoToken()
								)}
							</FormItem>
						)}
						<FormItem>
							<Title
								text='Voting fee:'
								userGuideType='can_vote'
								type='dark'
								id='can_vote'
								titleStyle={{
									color: '#fff',
									fontSize: '16px',
									lineHeight: 'unset',
								}}
							/>
							{token_to_vote.tokenList.length > 0 ? (
								<>
									<TokensList
										onChooseCoin={(value: string) => setTokenToVote(value)}
										tokenType={tokenToVote || token_to_vote?.tokenList[0]?.name}
										isLoading={token_to_vote.isLoading}
										tokenList={token_to_vote.tokenList}
										style={{
											justifyContent: 'left',
											marginTop: '10px',
											marginBottom: '0px',
										}}
									/>
									<Input type='text' {...register('fee')} placeholder='Voting fee..' />
									<ErrorText>{errors?.fee?.message}</ErrorText>
								</>
							) : (
								NoToken()
							)}
						</FormItem>
						<FormItem>
							<CandidateOptions
								fields={fields}
								errors={errors}
								register={register}
								control={control}
								onAdd={() => append(OptionDefault)}
								onRemove={(index: number) => remove(index)}
							/>
						</FormItem>

						<FlexLayoutBtn>
							<DefaultButton type='button' onClick={() => navigate(-1)}>
								Back
							</DefaultButton>
							<SubmitButton
								type='submit'
								disabled={
									token_to_vote.tokenList.length === 0 || token_to_create.tokenList.length === 0
								}>
								{!campaignId ? 'Create' : 'Save'}
							</SubmitButton>
						</FlexLayoutBtn>
					</Form>
				</Content>
			</ContentWrapper>
		</Container>
	)
}

export default CampaignForm
