import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LIST_VOTER } from 'utils/contants'
import { VoterHandleRes } from 'utils/interface'

export default function VoterHandle(): VoterHandleRes {
	const { campaignId } = useParams()
	const [items, setItems] = useState([])
	const [paging, setPaging] = useState({
		currentPage: 1,
		pageSize: 10,
		totalPage: 1,
	})

	const { isLoading, fetchApi } = useRequest()

	const getData = async () => {
		if (campaignId) {
			const data = {
				id: parseInt(campaignId),
				action: LIST_VOTER,
				page: paging.currentPage,
				limit: paging.pageSize,
			}
			const result = await fetchApi(data)
			setItems(result.data)
			setPaging({
				currentPage: result.page,
				pageSize: result.limit,
				totalPage: result.total,
			})
		}
	}

	return {
		isLoading,
		paging,
		items,
		setPaging,
		getData,
	}
}
