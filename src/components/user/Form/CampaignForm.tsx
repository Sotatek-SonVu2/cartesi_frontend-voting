import { yupResolver } from '@hookform/resolvers/yup'
import MDEditor from '@uiw/react-md-editor'
import Label from 'common/Label'
import Loading from 'common/Loading'
import ReactSelect, { OptionsType } from 'common/ReactSelect'
import Title from 'common/Title'
import TokensList from 'common/TokensList'
import CampaignHandle from 'handles/campaign.handle'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Content, DefaultButton, FlexLayoutBtn, SuccessButton } from 'styled/common'
import { ErrorText, Form, FormItem, Input } from 'styled/form'
import { Loader } from 'styled/loading'
import { ContentWrapper } from 'styled/main'
import { CampaignHandleRes, OptionType, ProfileType } from 'utils/interface'
import * as yup from 'yup'
import CandidateOptions from '../Item/CandidateOptions'

const FORMAT_DATE_PICKER = 'MM/dd/yyyy h:mm aa'

const SubmitButton = styled(SuccessButton)`
	display: flex;
	align-items: center;
`

const NoTokens = styled.p`
	background: #dc3545;
	padding: 5px;
	border-radius: 5px;
	text-align: center;
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
		isRequestLoading,
		isLoading,
		callMessage,
		data: profileLists,
	}: CampaignHandleRes = CampaignHandle(setValue)

	const { startDate, endDate, formErrors } = dateTime
	const profileOptions =
		profileLists?.length > 0 &&
		profileLists.map((item: ProfileType) => {
			return {
				label: item.name,
				value: item.id,
			}
		})

	useEffect(() => {
		getDataForm()
		getProfileByUser()
	}, [campaignId, token_to_vote.isLoading, token_to_create.isLoading])

	return (
		<ContentWrapper>
			<Content>
				{isRequestLoading && <Loading isScreenLoading={isRequestLoading} messages={callMessage} />}
				{isLoading && <Loading isScreenLoading={isLoading} />}
				<Title
					text={!campaignId ? 'Create new campaign' : 'Edit campaign'}
					userGuideType={!campaignId ? 'create' : 'edit'}
				/>
				{token_to_create.tokenList.length > 0 && token_to_vote.tokenList.length > 0 ? (
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormItem>
							<Label required>Name:</Label>
							<Input type='text' {...register('name')} placeholder="Campaign's name.." />
							<ErrorText>{errors?.name?.message}</ErrorText>
						</FormItem>
						<FormItem>
							<Label>Profile:</Label>
							<Controller
								control={control}
								name='profile_id'
								render={({ field: { onChange, value } }) => {
									return (
										<ReactSelect
											onChange={onChange}
											options={profileOptions.length > 0 ? profileOptions : []}
											value={value}
											width='100%'
											controlBackground='#fff'
											valueColor='#000'
											controlColor='#000'
											styleWrapper={{
												marginTop: '10px',
											}}
											props={{
												isClearable: true,
											}}
										/>
									)
								}}
							/>
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
								<TokensList
									onChooseCoin={(value: string) => setTokenToCreate(value)}
									tokenType={tokenToCreate}
									isLoading={token_to_create.isLoading}
									tokenList={token_to_create.tokenList}
									style={{
										justifyContent: 'left',
										marginTop: '10px',
									}}
								/>
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
							<TokensList
								onChooseCoin={(value: string) => setTokenToVote(value)}
								tokenType={tokenToVote}
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
							<SubmitButton type='submit' disabled={isRequestLoading}>
								{isRequestLoading && <Loader />}
								{!campaignId ? 'Create' : 'Save'}
							</SubmitButton>
						</FlexLayoutBtn>
					</Form>
				) : (
					<NoTokens>
						You can't create campaign right row! <br />
						You can check out the Tokens page.
					</NoTokens>
				)}
			</Content>
		</ContentWrapper>
	)
}

export default CampaignForm
