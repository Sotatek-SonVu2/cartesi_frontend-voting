import { LoadingText, LoadingWrapper } from "../styled/loading"
import LoadingIcon from '../images/rocket.png'
import { useEffect, useState } from "react"

interface PropsType {
    isScreenLoading?: boolean
    messages?: string
}

const Loading = ({ isScreenLoading, messages }: PropsType) => {
    return (
        <LoadingWrapper isScreenLoading={isScreenLoading}>
            <img src={LoadingIcon} alt="loading icon" width={60} />
            <LoadingText>{messages || 'Loading...'}</LoadingText>
        </LoadingWrapper>
    )
}

export default Loading