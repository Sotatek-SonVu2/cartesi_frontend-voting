import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { FOLLOWED_CAMPAIGN } from 'utils/contants'
import { ProfileCampaignDataType, YourFollowingHandleRes } from 'utils/interface'

export default function YourFollowingHandle(): YourFollowingHandleRes {
	const { isLoading, fetchApi } = useRequest()
	const [data, setData] = useState<ProfileCampaignDataType[]>([])
	const [paging, setPaging] = useState({
		currentPage: 1,
		pageSize: 10,
		totalPage: 1,
	})

	const getLists = async () => {
		const params = {
			action: FOLLOWED_CAMPAIGN,
			page: paging.currentPage,
			limit: paging.pageSize,
			profile_id: null,
		}
		const result = await fetchApi(params)
		setData(result.data)
		setPaging({
			currentPage: result.page,
			pageSize: result.limit,
			totalPage: result.total,
		})
	}

	return {
		data,
		isLoading,
		paging,
		setPaging,
		getLists,
	}
}
