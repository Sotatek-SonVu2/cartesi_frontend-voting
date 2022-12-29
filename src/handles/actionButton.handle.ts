import { OptionsType } from 'common/ReactSelect'
import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { DELETE_CAMPAIGN } from 'utils/contants'
import { ActionButtonHandleRes } from 'utils/interface'

export default function ActionButtonHandle(onChangeType: any): ActionButtonHandleRes {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = `/${location.pathname.split('/')[1]}`
	const paramId = location.pathname.split('/')[2]
	const { isRequestLoading, fetchNotices, callMessage } = useRequest()

	const onChangeSelect = (opt: OptionsType) => {
		onChangeType(opt.value)
	}

	const toggleModal = () => {
		setIsOpen(!isOpen)
	}

	const handleDeleteSuccess = () => {
		navigate(ROUTER_PATH.HOMEPAGE, { replace: true })
		toggleModal()
	}

	const handleDeleteError = () => {
		toggleModal()
	}

	const onDelete = async () => {
		const params = {
			action: DELETE_CAMPAIGN,
			id: paramId && parseInt(paramId),
		}
		fetchNotices(params, handleDeleteSuccess, handleDeleteError)
	}

	return {
		onDelete,
		toggleModal,
		onChangeSelect,
		pathname,
		paramId,
		isOpen,
		isRequestLoading,
		callMessage,
	}
}
