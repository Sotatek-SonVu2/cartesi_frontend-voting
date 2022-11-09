import Loading from 'common/Loading'
import NoData from 'common/NoData'
import { createNotifications } from 'common/Notification'
import Title from 'common/Title'
import Tooltip from 'common/Tooltip'
import React, { useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useDispatch, useSelector } from 'react-redux'
import { getTokens } from 'reducers/tokenSlice'
import { AppDispatch, RootState } from 'store'
import styled from 'styled-components'
import { Content } from 'styled/common'
import { StatusText } from 'styled/list'
import { formatAddress } from 'utils/common'
import { NOTI_TYPE, TOKEN_STATUS } from 'utils/contants'
import { tokenType } from 'utils/interface'



const Tokens = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { tokenListing, isLoading } = useSelector((state: RootState) => state.token)

    const getData = async () => {
        dispatch(getTokens())
    }

    const handleCopy = () => {
        createNotifications(NOTI_TYPE.SUCCESS, 'Copied!')
    }


    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            text: 'Icon',
            dataField: 'icon',
            formatter: (cell: string) => (
                <img src={cell} alt="token-icon" width={20} />
            )
        },
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
            text: 'Status',
            dataField: 'is_disabled',
            formatter: (cell: number) => (
                <StatusText is_disabled={cell === TOKEN_STATUS.DISABLED}>
                    {cell === TOKEN_STATUS.DISABLED ? 'Inactive' : 'Active'}
                </StatusText>
            )
        },
    ];

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title text='Tokens' userGuideType='tokens' />
                    {tokenListing?.length > 0 ? (
                        <div style={{ marginTop: '15px' }}>
                            <BootstrapTable columns={columns} data={tokenListing} keyField='address' />
                        </div>

                    ) : (
                        <NoData />
                    )}
                </Content>
            )}
        </>
    )
}

export default Tokens
