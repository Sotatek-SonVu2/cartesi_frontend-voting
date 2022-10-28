import { Ttable, Theader, Tcolumn } from "styled/table"
import BootstrapTable from 'react-bootstrap-table-next';

interface PropsType {
    columns?: any
    data?: any
}

const Table = ({ columns, data }: PropsType) => {
    return (
        <div style={{ maxWidth: '100%' }}>
            <BootstrapTable columns={columns} data={data} keyField='user' />
        </div>
    )
}

export default Table