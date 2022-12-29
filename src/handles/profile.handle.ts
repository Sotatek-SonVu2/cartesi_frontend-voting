import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import {
	CREATE_PROFILE,
	DELETE_PROFILE,
	DETAIL_PROFILE,
	JOIN_PROFILE,
	LEAVE_PROFILE,
	LIST_CAMPAIGN_OF_PROFILE,
	LIST_PROFILE,
	UPDATE_PROFILE,
} from 'utils/contants'
import {
	ManagerType,
	ProfileCampaignDataType,
	ProfileHandleRes,
	ProfileType,
} from 'utils/interface'
import Thumbnail from 'images/profile.png'

export default function ProfileHandle(setValue?: UseFormSetValue<FieldValues>): ProfileHandleRes {
	const { profileId } = useParams()
	const navigate = useNavigate()
	const [data, setData] = useState<ProfileType[]>([])
	const [campaigns, setCampaigns] = useState<ProfileCampaignDataType[]>([])
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [paging, setPaging] = useState({
		currentPage: 1,
		pageSize: 10,
		totalPage: 1,
	})
	const { isLoading, fetchApi, fetchNotices, callMessage, isRequestLoading } = useRequest()

	const getLists = async () => {
		const params = {
			action: LIST_PROFILE,
			page: paging.currentPage,
			limit: paging.pageSize,
			my_profile: false,
			keyword: '',
		}
		const result = await fetchApi(params)
		setData(result.data)
		setPaging({
			currentPage: result.page,
			pageSize: result.limit,
			totalPage: result.total,
		})
	}

	const getCampaignByProfileId = async () => {
		if (profileId) {
			const params = {
				action: LIST_CAMPAIGN_OF_PROFILE,
				profile_id: parseInt(profileId),
				page: paging.currentPage,
				limit: paging.pageSize,
			}
			const result = await fetchApi(params)
			setCampaigns(result.data)
			setPaging({
				currentPage: result.page,
				pageSize: result.limit,
				totalPage: result.total,
			})
		}
	}

	const getProfileDetail = async () => {
		if (profileId) {
			const params = {
				action: DETAIL_PROFILE,
				id: parseInt(profileId),
			}
			const result = await fetchApi(params)
			setData(result)
			if (typeof setValue === 'function') {
				const { name, website, managers, social_media, description, thumbnail } = result
				const parseSocialMedia = social_media && JSON.parse(social_media)
				const arrManagers = managers.map((item: string) => {
					return {
						name: item,
					}
				})
				setValue('name', name)
				setValue('website', website)
				setValue('description', description)
				setValue('thumbnail', thumbnail)
				setValue('twitter', parseSocialMedia?.twitter)
				setValue('facebook', parseSocialMedia?.facebook)
				setValue('managers', [...arrManagers])
			}
		}
	}

	const handleCreateSuccess = (payload: any) => {
		const router = payload ? `${ROUTER_PATH.PROFILE}/${payload.id}` : ROUTER_PATH.PROFILE
		navigate(router)
	}

	const handleEditSuccess = () => {
		navigate(`${ROUTER_PATH.PROFILE}/${profileId}`)
	}

	const handleDeleteSuccess = () => {
		navigate(`${ROUTER_PATH.PROFILE}`)
	}

	const onCreateProfile = async (data: ProfileType) => {
		fetchNotices(data, handleCreateSuccess)
	}
	const onEditProfile = async (data: ProfileType) => {
		fetchNotices(data, handleEditSuccess)
	}

	const onDeleteProfile = async () => {
		if (profileId) {
			const data = {
				id: parseInt(profileId),
				action: DELETE_PROFILE,
			}
			fetchNotices(data, handleDeleteSuccess)
		}
	}

	const toggleModal = () => {
		setIsOpen(!isOpen)
	}

	const handleProfileSuccess = () => {
		getProfileDetail()
		getCampaignByProfileId()
	}

	const handleJoinProfile = (profile_id: number) => {
		const data = {
			profile_id,
			action: JOIN_PROFILE,
		}
		fetchNotices(data, handleProfileSuccess)
	}

	const handleLeaveProfile = (profile_id: number) => {
		const data = {
			profile_id,
			action: LEAVE_PROFILE,
		}
		fetchNotices(data, handleProfileSuccess)
	}

	const onSubmit = async (dataForm: any) => {
		const { name, description, website, thumbnail, managers, twitter, facebook } = dataForm
		const data: ProfileType = {
			action: !profileId ? CREATE_PROFILE : UPDATE_PROFILE,
			name,
			description,
			website,
			thumbnail: thumbnail ? thumbnail : Thumbnail,
			social_media: {
				twitter: twitter || '',
				facebook: facebook || '',
			},
			managers: managers.map((item: ManagerType) => {
				return item.name
			}),
		}

		if (!profileId) {
			onCreateProfile(data)
		} else {
			const newData: ProfileType = {
				id: parseInt(profileId),
				...data,
			}
			onEditProfile(newData)
		}
	}

	return {
		getProfileDetail,
		getCampaignByProfileId,
		onDeleteProfile,
		getLists,
		setPaging,
		onSubmit,
		toggleModal,
		handleJoinProfile,
		handleLeaveProfile,
		isOpen,
		paging,
		data,
		campaigns,
		isLoading,
		isRequestLoading,
		callMessage,
	}
}
