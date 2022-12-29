import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { NOTIFICATION } from 'utils/contants'
import { NotificationHandleRes } from 'utils/interface'

const PAGE_DEFAULTS = {
	currentPage: 1,
	pageSize: 10,
	totalPage: 0,
}

export default function NotificationHandle(): NotificationHandleRes {
	const [items, setItems] = useState([])
	const [paging, setPaging] = useState(PAGE_DEFAULTS)
	const { currentPage, pageSize } = paging

	const { fetchApi, isLoading } = useRequest()

	const getData = async (page?: number, isReload?: boolean) => {
		const params = {
			action: NOTIFICATION,
			page: page || currentPage,
			limit: pageSize,
		}
		const result = await fetchApi(params)
		const list = isReload ? result.data : items.concat(result.data)
		setItems(list)
		setPaging({
			currentPage: result.page,
			pageSize: result.limit,
			totalPage: result.total,
		})
	}

	const reloadData = (isReload: boolean) => {
		setPaging(PAGE_DEFAULTS)
		getData(PAGE_DEFAULTS.currentPage, isReload)
	}

	return {
		isLoading,
		items,
		paging,
		getData,
		reloadData,
		setPaging,
	}
}
