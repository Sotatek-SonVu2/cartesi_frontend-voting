import EmptyIcon from '../images/no-data.png'
import { NoDataWrapper } from '../styled/common'

const NoData = () => {
    return (
        <NoDataWrapper>
            <img src={EmptyIcon} alt="empty icon" width={100} />
            <p>No Data</p>
        </NoDataWrapper>
    )
}

export default NoData