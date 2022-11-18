import EmptyIcon from 'images/no-data.png'
import { NoDataWrapper } from 'styled/common'

interface PropsType {
    style?: any
    iconStyle?: any
}

const NoData = ({ style, iconStyle }: PropsType) => {
    return (
        <NoDataWrapper style={{ ...style }}>
            <img src={EmptyIcon} alt="empty icon" style={{ ...iconStyle }} />
            <p>No Data</p>
        </NoDataWrapper>
    )
}

export default NoData