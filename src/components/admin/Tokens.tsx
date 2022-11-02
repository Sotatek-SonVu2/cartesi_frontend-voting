import NoData from 'common/NoData';
import { createNotifications } from 'common/Notification';
import Tooltip from 'common/Tooltip';
import { handleInspectApi } from 'helper/handleInspectApi';
import { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { colorTheme, SuccessButton } from 'styled/common';
import { DELETE_TOKEN, ERROR_MESSAGE, LIST_TOKEN, NOTI_TYPE, NO_RESPONSE_ERROR, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from 'utils/contants';
import { MetadataType, resInput, tokenType } from 'utils/interface';
import AddEditToken from './Modal/AddEditToken';
import EditButton from 'images/edit-button.png'
import DeleteButton from 'images/delete-button.png'
import { ActionColumn } from 'styled/form';
import ConfimModal from 'common/ConfimModal';
import { formatAddress } from 'utils/common';
import { sendInput } from 'helper/sendInput';
import { handleResponse } from 'helper/handleResponse';
import Loading from 'common/Loading';
import CopyToClipboard from 'react-copy-to-clipboard';

export const CreateButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    padding: 5px 10px;
    float: right;
    margin-bottom: 1rem;
`

const Tokens = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [items, setItems] = useState<tokenType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [rowData, setRowData] = useState<tokenType | null>(null)
    const [callMessage, setCallMessage] = useState<string>('')

    const getData = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: LIST_TOKEN,
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
                action: DELETE_TOKEN,
                address: rowData && rowData.address
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
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsLoading(false)
            setCallMessage('')
            throw error
        }
    }

    const showEditModal = (row: tokenType) => {
        setIsVisible(true)
        setRowData(row)
    }

    const showConfirm = (row: tokenType) => {
        setIsDelete(true)
        setRowData(row)
    }

    const handleCopy = () => {
        createNotifications(NOTI_TYPE.SUCCESS, 'Copied!')
    }

    const columns = [
        {
            text: 'Token',
            dataField: 'name',

        },
        {
            text: 'Address',
            dataField: 'address',
            formatter: (cell: string, row: tokenType) => (
                <Tooltip text={cell} placement="top" id={row.address} className="tooltip-sz-max">
                    <CopyToClipboard text={cell} onCopy={handleCopy}>
                        <div style={{ width: '100%' }}>{formatAddress(cell)}</div>
                    </CopyToClipboard>
                </Tooltip>
            )
        },
        {
            text: 'Fee',
            dataField: 'fee',
        },
        {
            text: '',
            dataField: 'action',
            formatter: (_: number, row: tokenType) => (
                <ActionColumn>
                    <img src={EditButton} alt="edit-button" width={15} onClick={() => showEditModal(row)} />
                    <img src={DeleteButton} alt="delete-button" width={15} onClick={() => showConfirm(row)} />
                </ActionColumn>
            )
        },
    ];

    return (
        <>
            <CreateButton onClick={toggleModal}>Create new token</CreateButton>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {items?.length > 0 ? (
                        <BootstrapTable columns={columns} data={items} keyField='address' />
                    ) : (
                        <NoData />
                    )}
                </>
            )}
            {isVisible && (
                <AddEditToken
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
                    title='Are you sure to delete this token?'
                />
            )}
        </>
    )
}

export default Tokens