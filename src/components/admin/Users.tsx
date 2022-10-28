import Table from 'common/Table'
import Tooltip from 'common/Tooltip';
import React, { useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { CreateButton, FlexForm, InputForm } from 'styled/admin';
import { SuccessButton } from 'styled/common';
import { Input } from 'styled/form';
import { FlexLayout } from 'styled/main';




const Users = () => {
    const onChange = (e: any) => {
        console.log('e', e.target.value)
    }

    const columns = [
        {
            text: 'User',
            dataField: 'user',
            formatter: (cell: string, row: any) => (
                // <CopyToClipboard text={cell} onCopy={handleCopy}>
                <Tooltip text={cell} placement="top" id={row.key} className="tooltip-sz-max">
                    <div className='text-long'>{cell}</div>
                </Tooltip>
                // </CopyToClipboard>
            )
        },
        {
            text: 'User manage',
            dataField: 'manage_user',
            formatter: (cell: number) => (
                <input type="checkbox" checked={cell === 1} onChange={onChange} />
            ),
        },
        {
            text: 'Token manage',
            dataField: 'manage_token',
            formatter: (cell: number) => (
                <input type="checkbox" checked={cell === 1} onChange={onChange} />
            ),
        },
        {
            text: 'Post manage',
            dataField: 'manage_post',
            formatter: (cell: number) => (
                <input type="checkbox" checked={cell === 1} onChange={onChange} />
            ),
        },
        {
            text: 'System manage',
            dataField: 'manage_system',
            formatter: (cell: number) => (
                <input type="checkbox" checked={cell === 1} onChange={onChange} />
            ),
        },
    ];

    const data = [
        {
            key: '1',
            user: '12339Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            manage_user: 0,
            manage_token: 1,
            manage_post: 0,
            manage_system: 1
        },
        {
            key: '2',
            user: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92288',
            manage_user: 1,
            manage_token: 1,
            manage_post: 0,
            manage_system: 0
        },
    ]

    return (
        <>
            <FlexForm>
                <InputForm type="text" name="name" placeholder="Please enter new token address..." />
                <CreateButton>Create new user</CreateButton>
            </FlexForm>

            <BootstrapTable columns={columns} data={data} keyField='user' />
        </>
    )
}
export default Users