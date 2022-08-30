import { LoadingWrapper } from "../styled/loading"
import LoadingIcon from '../images/rocket.png'

const Loading = () => {
    return (
        <LoadingWrapper>
            <img src={LoadingIcon} alt="loading icon" width={75} />
            <p>Loading...</p>
        </LoadingWrapper>
    )
}

export default Loading