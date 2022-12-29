import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { ACTION_HISTORY, historyOptions } from 'utils/contants'
import { HistoryHandleRes } from 'utils/interface'

export default function HistoryHandle(): HistoryHandleRes {
	const [items, setItems] = useState([])
	const [paging, setPaging] = useState({
		currentPage: 0,
		pageSize: 10,
		totalPage: 0,
	})
	const [type, setType] = useState(historyOptions[0].value)
	const { isLoading, fetchApi } = useRequest()
	const { currentPage, pageSize } = paging

	const getData = async () => {
		const page = currentPage + 1
		const params = {
			action: ACTION_HISTORY,
			page,
			limit: pageSize,
			type,
		}
		const result = await fetchApi(params)
		const list = items.concat(result.data)
		setItems(list)
		setPaging({
			currentPage: result.page,
			pageSize: result.limit,
			totalPage: result.total,
		})
	}

	const onChangeSelect = (opt: { value: string; label: string }) => {
		setType(opt.value)
		setItems([])
		setPaging({
			...paging,
			currentPage: 0,
		})
	}

	return {
		isLoading,
		paging,
		items,
		type,
		onChangeSelect,
		getData,
	}
}
