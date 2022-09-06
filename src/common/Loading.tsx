import { LoadingWrapper } from "../styled/loading"
import LoadingIcon from '../images/rocket.png'
import { useEffect, useState } from "react"

interface PropsType {
    isScreenLoading?: boolean
    messages?: string
}

const Loading = ({ isScreenLoading, messages }: PropsType) => {
    return (
        <LoadingWrapper isScreenLoading={isScreenLoading}>
            <img src={LoadingIcon} alt="loading icon" width={75} />
            <p>Loading...</p>
            <p>{messages}</p>
        </LoadingWrapper>
    )
}

export default Loading