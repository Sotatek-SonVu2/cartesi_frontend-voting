import ConfimModal from 'common/ConfimModal'
import Loading from 'common/Loading'
import { createNotifications } from 'common/Notification'
import Table from 'common/Table'
import Tooltip from 'common/Tooltip'
import { handleInspectApi } from 'helper/handleInspectApi'
import { handleResponse } from 'helper/handleResponse'
import { sendInput } from 'helper/sendInput'
import DeleteButton from 'images/delete-button.png'
import EditButton from 'images/edit-button.png'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import styled from 'styled-components'
import { colorTheme, SuccessButton } from 'styled/common'
import { ActionColumn } from 'styled/form'
import { formatAddress } from 'utils/common'
import {
	ADMIN_ACTION,
	DELETE_ROLE,
	ERROR_MESSAGE,
	LIST_ROLE,
	NOTI_TYPE,
	NO_RESPONSE_ERROR,
	WAITING_FOR_CONFIRMATION,
	WAITING_RESPONSE_FROM_SERVER_MESSAGE,
} from 'utils/contants'
import { MetadataType, resInput, usersType } from 'utils/interface'
import AddEditUser from './Modal/AddEditUser'

export const CreateButton = styled(SuccessButton)`
	background-color: ${colorTheme.success};
	color: #ffffff;
	padding: 5px 10px;
	float: right;
	margin-bottom: 1rem;
`

const checkBox = (cell: number) => {
	return <input type='checkbox' checked={cell === ADMIN_ACTION.YES} readOnly />
}

const Users = () => {
	const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
	const [items, setItems] = useState<usersType[]>([])
	const [rowData, setRowData] = useState<usersType | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isDelete, setIsDelete] = useState<boolean>(false)
	const [callMessage, setCallMessage] = useState<string>('')

	const getData = async () => {
		try {
			setIsLoading(true)
			const data = {
				action: LIST_ROLE,
				roles: [],
			}
			const result = await handleInspectApi(data, metadata)
			if (result && !result.error) {
				setItems(result.data)
			} else {
				createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
			}
		} catch (error) {
			createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	const toggleModal = () => {
		setIsVisible(!isVisible)
		setRowData(null)
	}

	useEffect(() => {
		getData()
	}, [])

	const onDelete = async () => {
		try {
			setIsLoading(true)
			setCallMessage(WAITING_FOR_CONFIRMATION)
			const payload = {
				action: DELETE_ROLE,
				user: rowData && rowData.user,
			}
			const { epoch_index, input_index }: resInput = await sendInput(payload)
			handleResponse(epoch_index, input_index, (payload: any) => {
				if (!payload || (payload.message !== NO_RESPONSE_ERROR && !payload.error)) {
					const message = payload ? payload.message : WAITING_RESPONSE_FROM_SERVER_MESSAGE
					createNotifications(NOTI_TYPE.SUCCESS, message)
					setIsLoading(false)
					setIsDelete(false)
					getData()
				} else if (payload.message === NO_RESPONSE_ERROR) {
					setCallMessage(`Waiting: ${payload.times}s.`)
				} else {
					createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
					setIsLoading(false)
				}
			})
		} catch (error: any) {
			createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
			setIsLoading(false)
			throw error
		} finally {
			setCallMessage('')
		}
	}

	const showConfirm = (row: usersType) => {
		setIsDelete(true)
		setRowData(row)
	}

	const showEditModal = (row: usersType) => {
		setIsVisible(true)
		setRowData(row)
	}

	const handleCopy = () => {
		createNotifications(NOTI_TYPE.SUCCESS, 'Copied!')
	}

	const columns = [
		{
			text: 'User',
			dataField: 'user',
			formatter: (cell: string, row: usersType) => (
				<Tooltip text={cell} placement='top' id={row.user} className='tooltip-sz-max'>
					<CopyToClipboard text={cell} onCopy={handleCopy}>
						<div style={{ width: '170px' }}>{formatAddress(cell)}</div>
					</CopyToClipboard>
				</Tooltip>
			),
		},
		{
			text: 'User management',
			dataField: 'manage_user',
			formatter: (cell: number) => checkBox(cell),
		},
		{
			text: 'Token management',
			dataField: 'manage_token',
			formatter: (cell: number) => checkBox(cell),
		},
		{
			text: 'Post management',
			dataField: 'manage_post',
			formatter: (cell: number) => checkBox(cell),
		},
		{
			text: 'System management',
			dataField: 'manage_system',
			formatter: (cell: number) => checkBox(cell),
		},
		{
			text: '',
			dataField: 'action',
			formatter: (_: number, row: usersType) => (
				<ActionColumn>
					<img src={EditButton} alt='edit-button' width={15} onClick={() => showEditModal(row)} />
					<img src={DeleteButton} alt='delete-button' width={15} onClick={() => showConfirm(row)} />
				</ActionColumn>
			),
		},
	]

	return (
		<>
			<CreateButton onClick={toggleModal}>Create new user</CreateButton>
			{isLoading ? <Loading /> : <Table columns={columns} data={items} keyField='id' />}

			{isVisible && (
				<AddEditUser
					isVisible={isVisible}
					toggleModal={toggleModal}
					data={rowData}
					getData={getData}
				/>
			)}
			{isDelete && (
				<ConfimModal
					isVisible={isDelete}
					toggleModal={() => setIsDelete(false)}
					onClick={onDelete}
					isLoading={isLoading}
					callMessage={callMessage}
					buttonText='Delete'
					title='Are you sure to delete this user?'
				/>
			)}
		</>
	)
}
export default Users
