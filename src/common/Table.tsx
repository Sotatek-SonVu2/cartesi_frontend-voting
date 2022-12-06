import BootstrapTable from 'react-bootstrap-table-next';
import NoData from "./NoData";

interface PropsType {
    columns?: any
    data?: any
    keyField: string
}

const Table = (props: PropsType) => {
    const { columns, data, keyField, ...rest } = props
    return (
        <div style={{ maxWidth: '100%' }}>
            <BootstrapTable
                columns={columns}
                data={data}
                keyField={keyField}
                noDataIndication={() => (<NoData style={{ minHeight: 'unset' }} iconStyle={{ width: '10%' }} />)}
                {...rest}
            />
        </div>
    )
}

export default Table