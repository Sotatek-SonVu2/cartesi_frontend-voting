import { createNotifications } from 'common/Notification'
import useRequest from 'hook/useRequest'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getDepositInfo } from 'reducers/authSlice'
import { ROUTER_PATH } from 'routes/contants'
import { AppDispatch, RootState } from 'store'
import { convertUtcToLocal } from 'utils/common'
import { CAMPAIGN_DETAIL, FORMAT_DATETIME, NOTI_TYPE, VOTE } from 'utils/contants'
import {
	CampaignVotingType,
	CandidatesVotingType,
	DepositInfoType,
	VoteHandleRes,
} from 'utils/interface'

interface DataType {
	campaign: CampaignVotingType
	candidates: CandidatesVotingType[]
	voted: any
}

export default function VoteHandle(): VoteHandleRes {
	const [campaignType, setCampaignType, isActionButton, setIsActionButton] = useOutletContext<any>()
	const dispatch = useDispatch<AppDispatch>()
	const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)
	const { campaignId, profileId, type } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isCloseVoting, setIsCloseVoting] = useState<boolean>(false)
	const [comment, setComment] = useState<string>('')
	const [data, setData] = useState<DataType>({
		campaign: {
			creator: '',
			description: '',
			end_time: '',
			id: 0,
			name: '',
			start_time: '',
			fee: 0,
			accept_token: '',
		},
		candidates: [],
		voted: {},
	})
	const { fetchApi, fetchNotices, success, setCandidateId, candidateId } = useRequest()

	const getLists = async () => {
		if (campaignId) {
			try {
				setIsLoading(true)
				const params = {
					action: CAMPAIGN_DETAIL,
					campaign_id: parseInt(campaignId),
				}
				const result = await fetchApi(params)
				if (result?.campaign?.length > 0) {
					// Convert UTC+0 datetime to local datetime and format
					const start_time = moment(
						convertUtcToLocal(new Date(result.campaign[0].start_time))
					).format(FORMAT_DATETIME)
					const end_time = moment(convertUtcToLocal(new Date(result.campaign[0].end_time))).format(
						FORMAT_DATETIME
					)
					const now = moment(new Date()).format(FORMAT_DATETIME)
					const isStartTime = moment(start_time).isBefore(now) // Compare start time with current datetime
					const isEndTime = moment(end_time).isBefore(now) // Compare end time with current datetime
					setIsCloseVoting(!isStartTime || isEndTime)
					setData({
						campaign: {
							...result.campaign[0],
							start_time,
							end_time,
						},
						candidates: result.candidates,
						voted: result.voted,
					})
					setCandidateId(result.voted?.candidate_id)
					setIsActionButton({
						creator: result.campaign[0].creator,
						isVisible: !isStartTime,
					})
				}
			} catch (error) {
				throw error
			} finally {
				setIsLoading(false)
			}
		}
	}

	const onChooseCandidate = (id: number) => {
		if (data.voted?.candidate_id || isCloseVoting) return
		setCandidateId(id)
	}

	const handleVoteSuccess = () => {
		dispatch(getDepositInfo())
		navigate(`${ROUTER_PATH.RESULT}/${campaignId}/profile/${profileId}/${type}`)
	}

	const handleVoting = async () => {
		const token: any = deposit_info.find(
			(deposit: DepositInfoType) => deposit.contract_address === data.campaign?.accept_token
		)
		const amount = token?.amount - token?.used_amount - token?.withdrawn_amount
		if (amount && amount > data?.campaign?.fee) {
			const params = {
				action: VOTE,
				comment,
				candidate_id: candidateId,
				campaign_id: campaignId && parseInt(campaignId),
			}
			fetchNotices(params, handleVoteSuccess)
		} else {
			createNotifications(NOTI_TYPE.DANGER, "Oops! You don't have enough tokens in the DApp!")
		}
	}

	return {
		getLists,
		handleVoting,
		onChooseCandidate,
		setComment,
		comment,
		isCloseVoting,
		candidateId,
		data,
		isLoading,
		success,
	}
}
