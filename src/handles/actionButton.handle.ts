import { OptionsType } from 'common/ReactSelect'
import useRequest from 'hook/useRequest'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { DELETE_CAMPAIGN } from 'utils/contants'
import { ActionButtonHandleRes } from 'utils/interface'

export default function ActionButtonHandle(onChangeType: any): ActionButtonHandleRes {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const navigate = useNavigate()
	const location = useLocation()
	const { campaignId, profileId } = useParams()
	const pathname = `/${location.pathname.split('/')[1]}`

	const { fetchNotices } = useRequest()

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
			id: campaignId && parseInt(campaignId),
		}
		toggleModal()
		fetchNotices(params, handleDeleteSuccess, handleDeleteError)
	}

	return {
		onDelete,
		toggleModal,
		onChangeSelect,
		pathname,
		campaignId,
		profileId,
		isOpen,
	}
}
