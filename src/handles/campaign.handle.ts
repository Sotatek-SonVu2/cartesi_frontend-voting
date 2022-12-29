import { createNotifications } from 'common/Notification'
import { OptionsType } from 'common/ReactSelect'
import useRequest from 'hook/useRequest'
import useTokensList from 'hook/useTokensList'
import moment from 'moment'
import { useState } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getDepositInfo } from 'reducers/authSlice'
import { ROUTER_PATH } from 'routes/contants'
import { AppDispatch } from 'store'
import { convertLocalToUtc, convertUtcToLocal, randomColor } from 'utils/common'
import {
	CAMPAIGN_DETAIL,
	CREATE_CAMPAIGN,
	EDIT_CAMPAIGN,
	FORMAT_DATETIME,
	GET_CAN_CREATE_ACTIVE,
	GET_CAN_VOTE_ACTIVE,
	LIST_CAMPAIGN,
	LIST_PROFILE_OF_CURRENT_USER,
	NOTI_TYPE,
} from 'utils/contants'
import getTokenAddress from 'utils/getTokenAddress'
import { AddEditDataType, CampaignHandleRes, OptionType, tokenType } from 'utils/interface'
import { validateDate } from 'utils/validate'

export default function CampaignHandle(setValue?: UseFormSetValue<FieldValues>): CampaignHandleRes {
	const navigate = useNavigate()
	const { campaignId } = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const [data, setData] = useState(null)
	const [isMyCampaign, setIsMyCampaign] = useState<boolean>(false)
	const [tokenToCreate, setTokenToCreate] = useState<string>('')
	const [tokenToVote, setTokenToVote] = useState<string>('')
	const [paging, setPaging] = useState({
		currentPage: 1,
		pageSize: 10,
		totalPage: 1,
	})
	const [dateTime, setDateTime] = useState({
		startDate: new Date(),
		endDate: new Date(),
		formErrors: {
			startDate: '',
			endDate: '',
		},
	})
	const [campaignType] = useOutletContext<any>()
	const token_to_create = useTokensList(GET_CAN_CREATE_ACTIVE)
	const token_to_vote = useTokensList(GET_CAN_VOTE_ACTIVE)
	const { isLoading, fetchApi, fetchNotices, callMessage, success, isRequestLoading } = useRequest()
	const { startDate, endDate, formErrors } = dateTime

	const getLists = async () => {
		const params = {
			action: LIST_CAMPAIGN,
			page: paging.currentPage,
			limit: paging.pageSize,
			type: campaignType,
			my_campaign: isMyCampaign,
		}
		const result = await fetchApi(params)
		setData(result.data)
		setPaging({
			currentPage: result.page,
			pageSize: result.limit,
			totalPage: result.total,
		})
	}

	const getDataForm = async () => {
		if (campaignId) {
			const params_detail = {
				action: CAMPAIGN_DETAIL,
				campaign_id: parseInt(campaignId),
			}
			const params_profile = {
				action: LIST_PROFILE_OF_CURRENT_USER,
			}
			const result_profile = await fetchApi(params_profile)
			const result_detail = await fetchApi(params_detail)
			if (!result_detail.error && !result_profile.error) {
				const { start_time, end_time, name, description, fee, accept_token, profile_id } =
					result_detail.campaign[0]
				const token = token_to_vote.tokenList?.find(
					(token: tokenType) => token.address === accept_token
				)?.name
				const options = result_detail.candidates.map((item: OptionType) => {
					return {
						name: item.name,
						brief_introduction: item.brief_introduction,
						avatar: item.avatar || '',
					}
				})
				setTokenToVote(token)
				setDateTime({
					startDate: new Date(convertUtcToLocal(new Date(start_time))),
					endDate: new Date(convertUtcToLocal(new Date(end_time))),
					formErrors: { startDate: '', endDate: '' },
				})
				setData(result_profile.data)
				if (typeof setValue === 'function') {
					const profile =
						result_profile.data?.length > 0 &&
						result_profile.data.find(
							(profile: any) => profile?.id === result_detail?.campaign[0].profile_id
						)
					setValue('name', name)
					setValue('description', description)
					setValue('fee', fee)
					setValue('options', [...options])
					setValue('profile_id', {
						value: profile.id,
						label: profile.name,
					})
				}
			} else {
				createNotifications(NOTI_TYPE.DANGER, result_detail?.error || result_profile?.error)
			}
		} else {
			setTokenToCreate(token_to_create.tokenList[0]?.name)
			setTokenToVote(token_to_vote.tokenList[0]?.name)
		}
	}

	const getProfileByUser = async () => {
		const params = {
			action: LIST_PROFILE_OF_CURRENT_USER,
		}
		const result = await fetchApi(params)
		setData(result.data)
	}

	const handleChangeDate = (key: string) => (value: Date) => {
		const validate = validateDate(key, value, endDate, startDate)
		setDateTime({
			...dateTime,
			formErrors: { ...formErrors, ...validate },
			[key]: value,
		})
	}

	const handleCreateSuccess = (payload: any) => {
		const router = payload ? `${ROUTER_PATH.VOTING}/${payload.id}` : ROUTER_PATH.HOMEPAGE
		dispatch(getDepositInfo())
		navigate(`${router}`)
	}

	const handleEditSuccess = () => {
		dispatch(getDepositInfo())
		navigate(`${ROUTER_PATH.VOTING}/${campaignId}`)
	}

	const createCampaign = async (data: AddEditDataType) => {
		fetchNotices(data, handleCreateSuccess)
	}

	const editCampaign = async (data: AddEditDataType) => {
		fetchNotices(data, handleEditSuccess)
	}

	const onSubmit = async (dataForm: any) => {
		const checkDate = validateDate('startDate', startDate, endDate, startDate)
		if (!checkDate?.startDate) {
			const data: AddEditDataType = {
				action: !campaignId ? CREATE_CAMPAIGN : EDIT_CAMPAIGN,
				name: dataForm.name,
				description: dataForm.description,
				profile_id: dataForm?.profile_id?.value || null,
				start_time: moment(convertLocalToUtc(startDate)).format(FORMAT_DATETIME), // Convert local datetime to UTC+0 datetime and format
				end_time: moment(convertLocalToUtc(endDate)).format(FORMAT_DATETIME), // Convert local datetime to UTC+0 datetime and format
				accept_token: getTokenAddress(token_to_vote.tokenList, tokenToVote),
				fee: dataForm.fee,
				candidates: dataForm.options.map((item: OptionType) => {
					return {
						name: item.name,
						brief_introduction: item.brief_introduction,
						avatar: randomColor(),
					}
				}),
			}
			if (!campaignId) {
				const newData: AddEditDataType = {
					token_address: getTokenAddress(token_to_create.tokenList, tokenToCreate),
					...data,
				}
				createCampaign(newData)
			} else {
				const newData: AddEditDataType = {
					id: parseInt(campaignId),
					...data,
				}
				editCampaign(newData)
			}
		} else {
			setDateTime({
				...dateTime,
				formErrors: { ...formErrors, ...checkDate },
			})
			createNotifications(NOTI_TYPE.DANGER, 'Please check the entered data!')
		}
	}

	return {
		getLists,
		setIsMyCampaign,
		setPaging,
		handleChangeDate,
		onSubmit,
		getDataForm,
		setTokenToCreate,
		getProfileByUser,
		setTokenToVote,
		tokenToCreate,
		token_to_create,
		tokenToVote,
		token_to_vote,
		dateTime,
		data,
		isMyCampaign,
		isLoading,
		isRequestLoading,
		paging,
		callMessage,
		campaignType,
		success,
	}
}
