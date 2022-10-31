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
import { ERROR_MESSAGE, LIST_TOKEN, NOTI_TYPE } from 'utils/contants';
import { MetadataType } from 'utils/interface';
import AddEditToken from './Modal/AddEditToken';

export const CreateButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    padding: 5px 10px;
    float: right;
    margin-bottom: 1rem;
`

const Tokens = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const columns = [
        {
            text: 'Token',
            dataField: 'token',

        },
        {
            text: 'Address',
            dataField: 'address',
            formatter: (cell: string, row: any) => (
                // <CopyToClipboard text={cell} onCopy={handleCopy}>
                <Tooltip text={cell} placement="top" id={row.key} className="tooltip-sz-max">
                    <div>{cell}</div>
                </Tooltip>
                // </CopyToClipboard>
            )
        },
        {
            text: 'Fee',
            dataField: 'fee',
        },
    ];

    const getData = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: LIST_TOKEN,
            }
            const result = await handleInspectApi(data, metadata)
            console.log('result', result)
            // if (result && !result.error) {
            //     setItems(result.data)
            //     setPaging({
            //         currentPage: result.page,
            //         pageSize: result.limit,
            //         totalPage: result.total
            //     })
            // } else {
            //     createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            // }
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <CreateButton onClick={toggleModal}>Create new token</CreateButton>
            {items?.length > 0 ? (
                <BootstrapTable columns={columns} data={items} keyField='token' />
            ) : (
                <NoData />
            )}
            {isVisible && (
                <AddEditToken
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                    isLoading={isLoading}
                />
            )}
        </>
    )
}
export default Tokens