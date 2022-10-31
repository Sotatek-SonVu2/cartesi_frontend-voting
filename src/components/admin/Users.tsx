import DeleteModal from 'common/DeleteModal';
import NoData from 'common/NoData';
import { createNotifications } from 'common/Notification';
import Tooltip from 'common/Tooltip';
import { handleInspectApi } from 'helper/handleInspectApi';
import { handleResponse } from 'helper/handleResponse';
import { sendInput } from 'helper/sendInput';
import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { colorTheme, SuccessButton } from 'styled/common';
import { DELETE_ROLE, ERROR_MESSAGE, LIST_ROLE, NOTI_TYPE, NO_RESPONSE_ERROR, USER_AUTH, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from 'utils/contants';
import { MetadataType, resInput, usersType } from 'utils/interface';
import AddEditUser from './Modal/AddEditUser';
import EditButton from 'images/edit-button.png'
import DeleteButton from 'images/delete-button.png'
import { ActionColumn } from 'styled/form';

export const CreateButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    padding: 5px 10px;
    float: right;
    margin-bottom: 1rem;
`

const checkBox = (cell: number) => {
    return <input type="checkbox" checked={cell === USER_AUTH.YES} readOnly />
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
                user: rowData && rowData.user
            }
            const { epoch_index, input_index }: resInput = await sendInput(payload);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
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
            }))
        } catch (error) {
            throw error
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

    const columns = [
        {
            text: 'User',
            dataField: 'user',
            formatter: (cell: string, row: usersType) => (
                // <CopyToClipboard text={cell} onCopy={handleCopy}>
                <Tooltip text={cell} placement="top" id={row.user} className="tooltip-sz-max">
                    <div className='text-long'>{cell}</div>
                </Tooltip>
                // </CopyToClipboard>
            )
        },
        {
            text: 'User manage',
            dataField: 'manage_user',
            formatter: (cell: number) => checkBox(cell)
        },
        {
            text: 'Token manage',
            dataField: 'manage_token',
            formatter: (cell: number) => checkBox(cell)
        },
        {
            text: 'Post manage',
            dataField: 'manage_post',
            formatter: (cell: number) => checkBox(cell)
        },
        {
            text: 'System manage',
            dataField: 'manage_system',
            formatter: (cell: number) => checkBox(cell)
        },
        {
            text: '',
            dataField: 'action',
            formatter: (_: number, row: usersType) => (
                <ActionColumn>
                    <img src={EditButton} alt="edit-button" width={15} onClick={() => showEditModal(row)} />
                    <img src={DeleteButton} alt="delete-button" width={15} onClick={() => showConfirm(row)} />
                </ActionColumn>
            )
        },
    ];

    return (
        <>
            <CreateButton onClick={toggleModal}>Create new user</CreateButton>
            {items?.length > 0 ? (
                <BootstrapTable columns={columns} data={items} keyField='id' />
            ) : (
                <NoData />
            )}
            {isVisible && (
                <AddEditUser
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                    data={rowData}
                    getData={getData}
                />
            )}
            {isDelete && (
                <DeleteModal
                    isVisible={isDelete}
                    toggleModal={() => setIsDelete(false)}
                    onClick={onDelete}
                    isLoading={isLoading}
                    callMessage={callMessage}
                />
            )}
        </>
    )
}
export default Users